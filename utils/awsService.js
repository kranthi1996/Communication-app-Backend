"use strict";
const AWS = require("aws-sdk");
const ID = "";
const SECRET = "";
const BUCKET_NAME = "masters-project-bucket";
const fs = require("fs");
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: "eu-west-2",
  },
};

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else {
    console.log("Bucket Created Successfully", data.Location);
  }
});

module.exports.uploadFile = (fileName) => {
  // Read content from the file
  //const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: "file1", // File name want to save as in S3
    Body: fileName,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location;
  });
};
