const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    studentid:{
        type: String,
        required: [true, "Please Provide Student ID"],
        unique:true
    },
    groupid:{
        type: String,
        required: [true, "Please Provide Research Group ID"]
    },
    researcharea:{
        type: String,
        required: [true, "Please Provide the Research Area"]
    },
    researchtopic:{
        type: String,
        required: [true, "Please Provide the Research Topic"]
    },
    result:{
        type: String,
        required: [true, "Please Provide a Result"],
    },
    evaluatorid:{
        type: String,
        required: [true, "Please Provide the Evaluator's ID"]
    },
    evaluatorname:{
        type: String,
        required: [true, "Please Provide the Evaluator's Name"]
    },
    evaluationdate:{
        type: Date,
        required: [true, "Please Provide a Date"],
    },
    remark:{
        type: String,
        required: [false],
    }
});


const Evaluation = mongoose.model("Evaluation", EvaluationSchema);

module.exports = Evaluation;
