const mongoose = require('mongoose')

//submission schema
const SubmissionSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type:String
    },
    sub_image: {
        type: String,
        required:false
    },
    author: {
        type: String,
        required:true
    },
    availability: {
        type: Boolean,
        required:true
    },
    dueDate: {
        type: String,
        required:true
    },
    categories: {
        type: Array,
        required:false
    }
    
},
{timestamps:true}
);

module.exports = mongoose.model("Submission",SubmissionSchema)