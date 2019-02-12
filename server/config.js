import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const { uploader } = cloudinary;

const cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRETKEY
  });
  next();
};

export default { cloudinaryConfig, uploader };
