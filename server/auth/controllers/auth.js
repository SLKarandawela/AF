const crypto = require('crypto')
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const sendEmail = require('../utils/sendEmail');

const ErrorResponse = require('../utils/errorResponse');

// exports.studentregister = async (req,res,next) => {
//     // res.send("Stuent Register Route");
//     const {studentid,studentfirstname,studentlastname,studentemail
//         ,studentpersonalemail,contactnumber,degree,specialization,password } = req.body;
//     try{
//         const student = await Student.create({
//             studentid,studentfirstname,studentlastname,studentemail,studentpersonalemail,contactnumber,degree,specialization,password
//         });

//         sendStudentToken(student, 201, res);
//     }catch (error){
//         next(error);
//     }    
// };

exports.studentregister = async (req, res, next) => {
    // res.send("Stuent Register Route");
    const {studentid,studentfirstname,studentlastname,studentemail
        ,studentpersonalemail,contactnumber,degree,specialization,role,password } = req.body;
    try{
        const student = await Student.create({
            studentid,studentfirstname,studentlastname,studentemail,studentpersonalemail,contactnumber,degree,specialization,role,password
        });

        console.log("this is res",res)

        role = student.role;
        stdId = student.id;
        sliitId = student.studentid

        sendStudentToken(stdId,student, 201, res,role,sliitId);
    }catch (error){
        next(error);
    }    
};

exports.staffregister = async (req,res,next) => {
    // res.send("Staff Register Route");
    const {staffid,stafffirstname,stafflastname,staffemail
        ,contactnumber,faculty,researcharea,password } = req.body;
    try{
        const staff = await Staff.create({
            staffid,stafffirstname,stafflastname,staffemail,contactnumber,faculty,researcharea,password
        });

        sendStaffToken(staff, 201, res);
    }catch (error){
        next(error);
    }    

};

exports.studentlogin = async (req,res,next) => {
    // res.send("Login Route");
    const {studentid, password} = req.body;

    if(!studentid || !password){
        return next(new ErrorResponse("Please provide a student ID and password", 400))
    }

    try {
        const student = await Student.findOne({studentid}).select("+password");

        if(!student){
            return next(new ErrorResponse("Invalid Credentials", 401))
            
        }

        const isMatch = await student.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401))
            

        }

        role = student.role;
        stdId = student.id;
        sliitId = student.studentid
        console.log("Student ID", stdId);
        sendStudentToken(student, 200, res,role,stdId,sliitId);
        


    } catch (error) {
        res.status(500).json({success:false, error:error.message});
    }
};

exports.stafflogin = async (req,res,next) => {
    // res.send("Login Route");
    const {staffid, password} = req.body;

    if(!staffid || !password){
        return next(new ErrorResponse("Please provide a staff ID and password", 400))
    }

    try {
        const staff = await Staff.findOne({staffid}).select("+password");

        if(!staff){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        const isMatch = await staff.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        sendStaffToken(staff, 200, res);

    } catch (error) {
        res.status(500).json({success:false, error:error.message});
    }
};

exports.studentforgotpassword = async (req,res,next) => {
    // res.send("Forgot Password Route");
    const {studentemail} = req.body;
    try {
       const student = await Student.findOne({studentemail});
       
       if(!student){
           return next(new ErrorResponse("Student Email could not be sent",404))
       }

       const studentresetToken = student.getResetPasswordToken();

       await student.save();

       const resetUrl = `http://localhost:5000/studentpasswordreset/${studentresetToken}`;

       const message = `
        <h1> You have requested a new password reset </h1>
        <p> Please go to this link to reset your password </p>
        <a href=${resetUrl} clicktracking="off>${resetUrl}</a>
       `

        try {
         await sendEmail({
             to: student.studentemail,
             subject: "Password Reset Request",
             text: message
         }) ;
         
         res.status(200).json({success:true,data: "Email Sent"});
        }catch (error) {
          student.resetPasswordtoken = undefined; 
          student.resetPasswordExpire = undefined; 

          await student.save();

          return next(new ErrorResponse("Email could not be sent",500));
        }
    } catch (error) {
        next(error);
    } 
};

exports.staffforgotpassword = async (req,res,next) => {
    // res.send("Forgot Password Route");
    const {staffemail} = req.body;
    try {
       const staff = await Staff.findOne({staffemail});
       
       if(!staff){
           return next(new ErrorResponse("Staff Email could not be sent",404))
       }

       const staffresetToken = staff.getResetPasswordToken();

       await staff.save();

       const resetUrl = `http://localhost:5000/staffpasswordreset/${staffresetToken}`;

       const message = `
        <h1> You have requested a new password reset </h1>
        <p> Please go to this link to reset your password </p>
        <a href=${resetUrl} clicktracking="off>${resetUrl}</a>
       `

       try {
        await sendEmail({
            to: staff.staffemail,
            subject: "Password Reset Request",
            text: message
        }) ;
        
        res.status(200).json({success:true,data: "Email Sent"});
       }catch (error) {
         staff.resetPasswordtoken = undefined; 
         staff.resetPasswordExpire = undefined; 

         await staff.save();

         return next(new ErrorResponse("Email could not be sent",500));
       }
   } catch (error) {
       next(error);
   }  
};

exports.resetstudentpassword = async (req,res,next) => {
    // res.send("Reset Password Route");
    const resetPasswordtoken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const student = await Student.findOne({
            resetPasswordtoken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!student){
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        student.password = req.body.password;
        student.resetPasswordtoken = undefined;
        student.resetPasswordExpire = undefined;

        await student.save();

        res.status(201).json({
            success:true,
            data:"Password Reset Success"
        })
    } catch (error) {
        next(error);
    }

};

exports.resetstaffpassword = async (req,res,next) => {
    // res.send("Reset Password Route");
    const resetPasswordtoken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const staff = await Staff.findOne({
            resetPasswordtoken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!staff){
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        staff.password = req.body.password;
        staff.resetPasswordtoken = undefined;
        staff.resetPasswordExpire = undefined;

        await staff.save();

        res.status(201).json({
            success:true,
            data:"Password Reset Success"
        })
    } catch (error) {
        next(error);
    }

};


exports.getSingleStudent = async (req, res) => {
  try {
    const selectedStudent = await Student.findById(req.params.id)
    res.status(200).json(selectedStudent);
      
  } catch (e) {
    res.status(500).json(e);
  }
   
};

exports.allUsers = async (req, res) => {
  try {
    let allUsers;
      allUsers = await Student.find();
    res.status(200).json(allUsers);
  } catch (e) {
    res.status(500).json(e);
  }
};



const sendStudentToken = (student, statusCode, res,role,stdId,sliitId) => {
    const token = student.getSignedToken();
    
    
    
    res.status(statusCode).json({success:true, token,role,stdId,sliitId})
}

const sendStaffToken = (staff, statusCode, res) => {
    const token = staff.getSignedToken();
    res.status(statusCode).json({success:true, token,role})
}
