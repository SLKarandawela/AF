const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StaffSchema = new mongoose.Schema({
    staffid:{
        type: String,
        required: [true, "Please Provide Staff ID"],
        unique:true
    },
    stafffirstname:{
        type: String,
        required: [true, "Please Provide a First Name"]
    },
    stafflastname:{
        type: String,
        required: [true, "Please Provide a Last Name"]
    },
    staffemail:{
        type: String,
        required: [true, "Please Provide Staff Email"],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid staff email",
        ]
    },
    contactnumber:{
        type: String,
        required: [true, "Please Provide a Contact Number"]
    },
    faculty:{
        type: String,
        required: [true, "Please Provide a Faculty"]
    },
    researcharea:{
        type: String,
        required: [true, "Please Provide a Research Area"]
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

StaffSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

StaffSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
};

StaffSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE,});
};

StaffSchema.method.getResetPasswordToken = function(){
    const staffresetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordtoken = crypto.createHash("sha256").update(staffresetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return staffresetToken;

}

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
