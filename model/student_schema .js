const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    StudentName: {
        type: String,
        require: true,
        unique: true
    },
    class: {
        type: Number,
        require: true
    },
    Roll: {
        type: Number,
        require: true
    },
    SchoolId: {
        type: Number,
        require: true
    }
});
const model = mongoose.model('studentDetails', schema, 'studentDetails')
module.exports = model;