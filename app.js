const { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');

const s3Client = new S3Client({
  endpoint: "http://*****", // MinIO server address
  region: "us-east-1", // MinIO doesn't require a specific region
  credentials: {
    accessKeyId: "X8z*********Ql5", // Replace with your access key
    secretAccessKey: "FAdIsW************rwN5D" // Replace with your secret key
  },
  forcePathStyle: true // Required for MinIO
});

async function uploadFile(bucketName, key, filePath) {
  const fileContent = fs.readFileSync(filePath);
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileContent
  });

  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully", response);
  } catch (err) {
    console.error("Error uploading file", err);
  }
}

async function listObjects(bucketName) {
  const command = new ListObjectsCommand({
    Bucket: bucketName
  });

  try {
    const response = await s3Client.send(command);
    console.log("Objects in bucket:", response.Contents);
  } catch (err) {
    console.error("Error listing objects", err);
  }
}

async function deleteObjects(bucketName, key) {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key
    });
    try {
      const response = await s3Client.send(command);
      console.log("File deleted successfully", response);
    } catch (err) {
        console.error("Error deleting file", err);
    }    
}

const bucketName = "bucket-name";
//upload image
uploadFile(bucketName, "test-5.png", "yourpath/Pictures/5.png");
//upload image into the sub directory
uploadFile(bucketName, "123456/test-5.png", "yourpath/Pictures/5.png");
//get list of assets in bucket
listObjects(bucketName);
//delete an asset
deleteObjects(bucketName, "123456/test-5.png")