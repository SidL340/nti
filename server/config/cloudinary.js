/**
 * config/cloudinary.js
 * Cloudinary v2 configuration.
 * We use multer's in-memory storage + streamifier to pipe the buffer
 * directly to Cloudinary's upload_stream — no v1-only adapter needed.
 */

import { v2 as cloudinary } from "cloudinary";
import multer               from "multer";
import streamifier          from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store file in memory (as Buffer) so we can stream it to Cloudinary
export const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WebP images are allowed"), false);
    }
  },
});

/**
 * uploadToCloudinary(buffer, folder)
 * Returns a Promise<{ url, publicId }> after uploading a Buffer to Cloudinary.
 * Call this inside your controller after multer has parsed the file.
 */
export const uploadToCloudinary = (buffer, folder = "nirmalatech/projects") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ width: 1200, height: 800, crop: "limit", quality: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

export default cloudinary;
