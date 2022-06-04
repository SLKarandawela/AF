const express = require('express');
const router = express.Router();
const {getStudentPrivateData} = require('../controllers/private');
const {getStaffPrivateData} = require('../controllers/private');
const {studentprotect} = require('../middleware/auth');
const {staffprotect} = require('../middleware/auth');

router.route("/student").get(studentprotect , getStudentPrivateData);
router.route("/staff").get(staffprotect , getStaffPrivateData);

module.exports = router;
