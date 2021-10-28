/*
  This is a Netlify Function that proxies our Elasticsearch instance.
*/
import fetch from "node-fetch";
import https from "https";
import http from "http";

import Busboy from "busboy";
import * as FormData from "form-data";
import {Buffer} from "buffer";


// Don't do this in production, this is in place to aid with demo environments which have self-signed certificates.
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const httpAgent = new http.Agent();

const parseMultipartForm = (event) => {
  return new Promise((resolve) => {
    const fields = {};

    const busboy = new Busboy({
      headers: event.headers
    });

    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        const buffers = {}
        buffers[fieldname] = []
        filestream.on('data', function (data) {
          buffers[fieldname].push(data);
        }).on('end', function () {
          const content = Buffer.concat(buffers[fieldname]);
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: content
          };
        });
      }
    );

    busboy.on('field', (fieldname, value) => {
      fields[fieldname] = value;
    });

    busboy.on('finish', () => {
      resolve(fields);
    });

    busboy.write(Buffer.from(event.body, "utf-8").toString("base64"), "base64");
    busboy.end();
  });
};

const parseMultipartName = (event) => {
  return new Promise((resolve) => {
    const fields = {};

    const busboy = new Busboy({
      headers: event.headers
    });

    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        console.log(filestream);
        filestream.on("data", (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
            filestream: filestream
          };
        });
      }
    );

    busboy.on('field', (fieldname, value) => {
      fields[fieldname] = value;
    });

    busboy.on('finish', () => {
      resolve(fields);
    });

    busboy.write(event.body);
    busboy.end();
  });
};


exports.handler = async function (event, context, callback) {
  const host = process.env.BACKEND_HOST;
  const agent = host.startsWith("http:") ? httpAgent : httpsAgent;

  console.log(event.headers);
  console.log(typeof event.body);
  console.log(event.body.substring(0, 500));
  const bf = Buffer.from(event.body, "base64");
  console.log(bf);

  // parse the incoming multipart/form-data data into fields object
  const dataFields = await parseMultipartForm(event);

  const nameFields = await parseMultipartName(event);
  console.log(dataFields);
  console.log(nameFields);

  // create new formdata object to be send to Lever
  const form = new FormData();

  form.append("file", dataFields["file"].content, nameFields["file"].filename);

  fetch(`${host}/spider/upload/file`, {
    method: "POST",
    body: form,
    agent
  })
    .then(response => response.text().then(body => [response, body]))
    .then(([response, body]) => {
      console.log(response);
      callback(null, {
        statusCode: response.status,
        body: body
      });
    })
    .catch(e => {
      console.error(e);
      callback(null, {
        statusCode: 500,
        body: `An error occurred: ${e}`
      });
    });
};
