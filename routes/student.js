const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");
const tokenValidation = require('../controller/isTokenValid')


router
    .route('/addStudent')
    .post(tokenValidation.isTokenValid, studentController.addStudent)
router
    .route('/allStudents')
    .get(tokenValidation.isTokenValid, studentController.getAllStudents)


module.exports = router;