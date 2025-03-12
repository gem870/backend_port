const Blog = require('../models/blog_schema');
const Project = require('../models/project_schema');
require('dotenv').config();



// --- Blog Controllers ---
const createBlogPost = async (req, res) => {
    const fileUrl = req.file ? `uploads/${req.file.filename}` : null;
    const { title, description, mediaType, code, programmingLanguage } = req.body;

    if (!title || !description || !code) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const blogPost = new Blog({
            title,
            description,
            mediaType,
            code,
            programmingLanguage,
            file: fileUrl
        });

        const savedPost = await blogPost.save();
        console.log("Created blog post:", savedPost);
        res.status(201).json({ message: 'Blog post created successfully', blogPost: savedPost });
    } catch (error) {
        handleError(res, 'Error creating blog post', error);
    }
};

const getAllBlogPosts = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        handleError(res, 'Error fetching blog posts', error);
    }
};

const getBlogPostById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog post not found' });

        // Add file URL validation
        if (blog.file) {
            blog.file = blog.file.startsWith('/') ? blog.file : `/uploads/${blog.file}`;
        }

        res.status(200).json(blog);
    } catch (error) {
        handleError(res, 'Error fetching blog post', error);
    }
};

// --- Project Controllers ---
const createProject = async (req, res) => {
    // Define the file URL if a file was uploaded, using the relative path
    const fileUrl = req.file ? `uploads/${req.file.filename}` : null;

    // Extract fields from the request body
    const { title, description, mediaType, url } = req.body;

    if (!title || !description || !mediaType || !url) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Create a new project entry using the Project schema
        const project = new Project({
            title,
            description,
            mediaType,
            url,
            file: fileUrl
        });

        // Save the new project to the database
        await project.save();

        // Respond with success message and created project
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        // Respond with an error message if saving the project fails
        handleError(res, 'Error creating project', error);
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        handleError(res, 'Error fetching projects', error);
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        handleError(res, 'Error fetching project', error);
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
