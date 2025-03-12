const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    createProject,
    getAllProjects,
    getProjectById
} = require('../controller/controller');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});








const upload = multer({ storage: storage, limits: { fileSize: 300 * 1024 * 1024 } });



// Blog Routes with file handling
router.post('/blogs', upload.single('file'), (req, res, next) => {
    // Handle Multer errors
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    createBlogPost(req, res);
});

router.get('/blogs', getAllBlogPosts);
router.get('/blogs/:id', getBlogPostById);


// Project Routes with file handling
router.post('/project', upload.single('file'), (req, res, next) => {
    // Handle Multer errors
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    createProject(req, res);
});

router.get('/project', getAllProjects);
router.get('/project/:id', getProjectById);


module.exports = router;