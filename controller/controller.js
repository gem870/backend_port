const Blog = require('../models/blog_schema');
const Project = require('../models/project_schema');
const cloudinary = require('../cloudinaryConfig.js');
const fs = require('fs');

// --- Blog Controllers ---
const createBlogPost = async (req, res) => {
    try {
        const { title, description, mediaType, code, programmingLanguage } = req.body;

        if (!title || !description || !code) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let fileUrl = null;

        if (req.file) {
            console.log("Uploading file to Cloudinary...");

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'blog_uploads',
                resource_type: 'auto'
            });

            console.log("Cloudinary upload result:", result); // Debugging log

            fileUrl = result.secure_url;

            // Check if local file exists before deleting it
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        const blogPost = new Blog({
            title,
            description,
            mediaType,
            code,
            programmingLanguage,
            file: fileUrl
        });

        const savedPost = await blogPost.save();
        res.status(201).json({ message: 'Blog post created successfully', blogPost: savedPost });
    } catch (error) {
        console.error("Error creating blog post:", error); // Log full error
        res.status(500).json({ message: 'Error creating blog post', error });
    }
};


const getAllBlogPosts = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog posts', error });
    }
};

const getBlogPostById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog post not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog post', error });
    }
};

// --- Project Controllers ---
const createProject = async (req, res) => {
    try {
        const { title, description, mediaType, url } = req.body;

        if (!title || !description || !mediaType) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let fileUrl = null;

        if (req.file) {
            console.log("Uploading file:", req.file.path);

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'project_uploads',
                resource_type: 'auto'
            });

            fileUrl = result.secure_url;

            if (fs.existsSync(req.file.path)) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });
            }
        }

        const projectData = { title, description, mediaType };
        if (fileUrl) projectData.file = fileUrl;
        if (url) projectData.url = url;

        const project = new Project(projectData);
        await project.save();

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: 'Error creating project', error });
    }
};


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    createProject,
    getAllProjects,
    getProjectById
};
