const mongoose = require('mongoose')
const schema = mongoose.Schema

// MY MODEL STRUCTURE OF MY API(MONGODB)

const blog_Schema = new schema({
    title:{
        type: String,
        required: true
    }, 
    description:{
        type: String,
        required: true
    }, 
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: false,
    },
    code:{
        type: String,
        required: true
    },
    programmingLanguage:{
        type: String,
        required: false
    }, 
    file:{
        type: String,
        required: false
    }
}, {timestamps: true});


module.exports = mongoose.model('BLOG_SCHEMA', blog_Schema);