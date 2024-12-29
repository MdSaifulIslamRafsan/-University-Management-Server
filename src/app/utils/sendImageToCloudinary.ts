import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from "fs";

export const sendImageToCloudinary = async (path :string, imageName : string) => {
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
        path,
      {
        public_id: imageName,
      },
    )
    .catch((error) => {
      return error
    });
 // Remove the file
fs.unlink(path, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
  });
  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
    
  },
});

export const upload = multer({ storage: storage });
