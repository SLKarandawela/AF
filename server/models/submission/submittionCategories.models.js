const mongoose = require('mongoose')

//submission schema
const SubmissionCategorySchema = new mongoose.Schema({
    catName: {
        type: String,
        required:true
    }
    
    
},
{timestamps}
);

module.exports = mongoose.model("SubmissionCategory",SubmissionCategorySchema)