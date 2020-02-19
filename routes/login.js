const express = require("express");
const router = express.Router();
const loginController = require("../controller/login.controller");
const tokenValidation = require('../controller/isTokenValid')


router
    .route('/register')
    .post(loginController.register)

router
    .route("/login")
    .post(loginController.login)


module.exports = router;