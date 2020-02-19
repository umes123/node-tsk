const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports.isTokenValid = function (req, res, next) {
    if (req.headers.access_token) {
        let token = req.headers.access_token;
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                res
                    .status(404)
                    .json({ error: [{ "description": "Invalid token", "additionalInfo": "Please logIn again" }] })
            }
            else {
                next()
            }
        });
    } else {
        res
            .status(401)
            .json({ error: [{ "description": "You are not authorised", "additionalInfo": "Please pass token in header as 'access_token'" }] })
    }
}