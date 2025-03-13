const express = require("express");
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig.js'); // Ensure correct path
const {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    createProject,
    getAllProjects,
    getProjectById
} = require('../controller/controller');

// ✅ Cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio-uploads', 
        resource_type: 'auto',  // ✅ Supports both images & videos
        allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'],
    },
});

const upload = multer({ storage });

// ✅ Blog Routes with Cloudinary upload
router.post('/blogs', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    req.body.fileUrl = req.file.path || req.file.url; // ✅ Correct Cloudinary URL handling
    createBlogPost(req, res);
});

router.get('/blogs', getAllBlogPosts);
router.get('/blogs/:id', getBlogPostById);

// ✅ Project Routes with Cloudinary upload
router.post('/project', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    req.body.fileUrl = req.file.path || req.file.url; // ✅ Correct Cloudinary URL handling
    createProject(req, res);
});

router.get('/project', getAllProjects);
router.get('/project/:id', getProjectById);

module.exports = router;
