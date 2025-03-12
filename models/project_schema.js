const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Project Schema for MongoDB
const project_schema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: false
    },
    url: {
        type: String,
        required: false
    },
    file: {  
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('PROJECT_SCHEMA', project_schema);
