// scripts/generate-sw.js

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const templateFilePath = path.resolve(
  __dirname,
  "../src/firebase-messaging-sw.template.js"
);
const outputFilePath = path.resolve(
  __dirname,
  "../public/firebase-messaging-sw.js"
);

const envVariables = {
  "%%REACT_APP_FIREBASE_API_KEY%%": process.env.REACT_APP_FIREBASE_API_KEY,
  "%%REACT_APP_FIREBASE_AUTH_DOMAIN%%":
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  "%%REACT_APP_FIREBASE_PROJECT_ID%%":
    process.env.REACT_APP_FIREBASE_PROJECT_ID,
  "%%REACT_APP_FIREBASE_STORAGE_BUCKET%%":
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "%%REACT_APP_FIREBASE_MESSAGING_SENDER_ID%%":
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  "%%REACT_APP_FIREBASE_APP_ID%%": process.env.REACT_APP_FIREBASE_APP_ID,
  "%%REACT_APP_FIREBASE_MEASUREMENT_ID%%":
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

fs.readFile(templateFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading template file:", err);
    return;
  }

  let outputData = data;
  for (const [placeholder, value] of Object.entries(envVariables)) {
    outputData = outputData.replace(new RegExp(placeholder, "g"), value);
  }

  fs.writeFile(outputFilePath, outputData, "utf8", (err) => {
    if (err) {
      console.error("Error writing output file:", err);
    } else {
      console.log("Service worker generated successfully.");
    }
  });
});
