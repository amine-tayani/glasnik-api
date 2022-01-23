const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  GLASNIK_ACTIVATION_EMAIL: process.env.GLASNIK_ACTIVATION_EMAIL,
  GLASNIK_ACTIVATION_PASSWORD: process.env.GLASNIK_ACTIVATION_PASSWORD,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_MEDIA_FOLDER: process.env.CLOUDINARY_MEDIA_FOLDER,
}
