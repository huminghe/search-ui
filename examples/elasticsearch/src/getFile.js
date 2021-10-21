import {Blob} from "blob-polyfill";

export default async function getFile(filePath, accountName) {
  try {
    const body = {
      filePath: filePath,
      accountName: accountName
    };
    const response = await fetch(".netlify/functions/getFile", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(body),
      responseType: 'blob'
    });
    const blob = await response.blob();
    const file = new Blob(
      [blob],
      {type: 'application/pdf'}
    );
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    return "成功";
  } catch (e) {
    console.error(e);
    return "失败";
  }
}
