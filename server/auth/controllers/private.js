exports.getStudentPrivateData = (req,res,next) => {
    res.status(200).json({
        success:true,
        data:"You got the access to the student private data in this route",

    })
} 

exports.getStaffPrivateData = (req,res,next) => {
    res.status(200).json({
        success:true,
        data:"You got the access to the staff private data in this route",

    })
}