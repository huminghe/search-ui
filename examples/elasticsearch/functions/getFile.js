/*
  This is a Netlify Function that proxies our Elasticsearch instance.
*/
import fetch from "node-fetch";
import https from "https";
import http from "http";
import { Buffer } from 'buffer';

// Don't do this in production, this is in place to aid with demo environments which have self-signed certificates.
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const httpAgent = new http.Agent();

exports.handler = function (event, context, callback) {
  const host = process.env.BACKEND_HOST;
  const agent = host.startsWith("http:") ? httpAgent : httpsAgent;
  console.log(event.body)
  fetch(`${host}/spider/file`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: event.body,
    responseType: 'arraybuffer',
    agent
  })
    .then(response => response.arrayBuffer().then(arr => [response, arr]))
    .then(([response, body]) => {
      console.log(body);
      callback(null, {
        statusCode: response.status,
        body: Buffer.from(body)
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
