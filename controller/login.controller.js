const login = require("../model/logIn_schema");
const config = require('../config/config');
const bcrypt = require("bcrypt");
const Joi = require('joi');
const jwt = require('jsonwebtoken');

async function getCount() {
    return login.find().count()
}

module.exports.register = async function (req, res, next) {
    try {
        const schema = {
            "username": Joi.string().required(),
            "password": Joi.string().required(),
            "SchoolId": Joi.number().required()
        }
        const result = Joi.validate(req.body, schema);

        if (result.error === null) {
            let hashPassword = bcrypt.hashSync(req.body.password, config.saltRounds);
            let newRegister = new login({
                id: await getCount() + 1,
                username: req.body.username,
                password: hashPassword,
                SchoolId: req.body.SchoolId,

            })
            await newRegister.save((err, response) => {
                if (err) {
                    res
                        .status(500)
                        .json({ error: [{ "description": "Failed to register", "additionalInfo": err.errmsg }] })

                } else {
                    res
                        .status(200)
                        .json({ message: "Registerd successfuly" })
                }
            })
        } else {
            res
                .status(400)
                .json({ error: [{ "description": result.error.message, "additionalInfo": null }] })

        }
    } catch (error) {
        console.log(error);

    }
}

module.exports.login = async function (req, res, next) {
    try {

        const schema = {
            "username": Joi.string().required(),
            "password": Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error === null) {
            await login
                .findOne({ username: req.body.username }, (err, response) => {
                    if (err) {
                        res
                            .status(500)
                            .json({ error: [{ "description": "Unable to fetch Records from DB", "additionalInfo": null }] })

                    } else if (response) {
                        let isPwd = bcrypt.compareSync(req.body.password, response.password);
                        if (!isPwd) {
                            res
                                .status(404)
                                .json({ error: [{ "description": "Wrong Password", "additionalInfo": null }] })

                        } else {
                            let token = jwt.sign({ _id: response.id }, config.secretKey);
                            res
                                .set({ 'access_token': token })
                                .status(200)
                                .json({ "token": token, message: "success" })
                        }
                    } else {
                        res
                            .status(404)
                            .json({ error: [{ "description": "User doesn't exist", "additionalInfo": "Please register" }] })
                    }
                })
        } else {
            res
                .status(400)
                .json({ error: [{ "description": result.error.message, "additionalInfo": null }] })

        }

    } catch (error) {
        console.log(error);

    }

};
