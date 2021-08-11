
const dotenv = require('dotenv')
const aws = require('aws-sdk')
const crypto = require('crypto')
const {promisify} = require('util')

const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-2"
const bucketName = "tvrs-video-container"
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 6000
  })

  return await s3.getSignedUrlPromise('putObject', params)
}

module.exports = {
  generateUploadURL: generateUploadURL
}