const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio-uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
