const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    SchoolId: {
        type: Number,
        require: true
    }
});
const model = mongoose.model('schoolLogin', schema, 'schoolLogin')
module.exports = model;