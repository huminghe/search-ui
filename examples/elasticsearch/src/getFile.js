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
    const fileType = getFileType(filePath);
    const file = new Blob(
      [blob],
      {type: fileType}
    );
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_self");
    return "成功";
  } catch (e) {
    console.error(e);
    return "失败";
  }
}

function getFileType(name) {
  if (name.endsWith("pdf")) {
    return "application/pdf";
  } else if (name.endsWith("ppt") || name.endsWith("pptx")) {
    return "application/vnd.ms-powerpoint";
  } else if (name.endsWith("doc") || name.endsWith("docx")) {
    return "application/msword";
  } else if (name.endsWith("xls") || name.endsWith("xlsx")) {
    return "application/vnd.ms-excel";
  } else {
    return "application/unknown";
  }
}
