const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Staff = require('../models/Staff');

const ErrorResponse = require('../utils/errorResponse');

exports.studentprotect = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("StudentBearer")) {
        //Bearer token
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(new ErrorResponse("Not authorized to access this route",401));
    }

    try {
        //decrypts the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decoded.id);

        //invalid token
        if(!student){
            return next(new ErrorResponse("No Student found with this id",404));
        }

        req.student = student;

        next();

    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route",401));
    }
}

//staff
exports.staffprotect = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("StaffBearer")) {
        //Bearer token
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(new ErrorResponse("Not authorized to access this route",401));
    }

    try {
        //decrypts the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const staff = await Staff.findById(decoded.id);

        //invalid token
        if(!staff){
            return next(new ErrorResponse("No Student found with this id",404));
        }

        req.staff = staff;

        next();

    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route",401));
    }
}