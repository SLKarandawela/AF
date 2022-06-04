const crypto = require("crypto");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StudentSchema = new mongoose.Schema({
    studentid:{
        type: String,
        required: [true, "Please Provide Student ID"],
        unique:true
    },
    studentfirstname:{
        type: String,
        required: [true, "Please Provide Student First Name"]
    },
    studentlastname:{
        type: String,
        required: [true, "Please Provide Student Last Name"]
    },
    studentemail:{
        type: String,
        required: [true, "Please Provide Student Email"],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid student email",
        ]
    },
    studentpersonalemail:{
        type: String,
        required: [true, "Please Provide Personal Email"],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid personal email",
        ]
    },
    contactnumber:{
        type: String,
        required: [true, "Please Provide a Contact Number"]
    },
    degree:{
        type: String,
        required: [true, "Please Provide a Degree"]
    },
    specialization:{
        type: String,
        required: [true, "Please Provide a Specialization"]
    },
    role:{
        type: String,
        required: [true, "Please Provide a Specialization"]
    },
    password:{
        type: String,
        required: [true, "Please Provide a Password"],
        minlength:6,
        select:false
    },
    resetPasswordtoken: String,
    resetPasswordExpire: Date
});

StudentSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

StudentSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
};

StudentSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE,});
};

StudentSchema.method.getResetPasswordToken = function(){
    const studentresetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordtoken = crypto.createHash("sha256").update(studentresetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return studentresetToken;

}

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
