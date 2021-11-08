const cloudinary = require('cloudinary')
require('dotenv').config()

async function uploadFile(file) {
  const { createReadStream } = await file
  const fileStream = createReadStream()

  // init cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_MEDIA_FOLDER,
      },
      function (err, fileUploaded) {
        if (err) {
          reject(err)
        }
        resolve(fileUploaded)
      },
    )
    fileStream.pipe(cloudStream)
  })
}

module.exports = { uploadFile }
