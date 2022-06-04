const express = require ('express');
const router = express.Router();

const { studentregister, staffregister, studentlogin, stafflogin, studentforgotpassword, staffforgotpassword, resetstudentpassword, resetstaffpassword,getSingleStudent,allUsers } = require('../controllers/auth');



router.route("/studentregister").post(studentregister);
router.route("/staffregister").post(staffregister);
router.route("/studentlogin").post(studentlogin);
router.route("/studentUsers").get(allUsers);
router.route("/stafflogin").post(stafflogin);
router.route("/studentforgotpassword").post(studentforgotpassword);
router.route("/staffforgotpassword").post(staffforgotpassword);
router.route("/resetstudentpassword/:resetToken").put(resetstudentpassword);
router.route("/resetstafftpassword/:resetToken").put(resetstaffpassword);
router.route("/student/:id").get(getSingleStudent); 


module.exports = router;
