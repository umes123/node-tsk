const mongoose = require("mongoose");

const schema = mongoose.Schema({
    studentId: {
        type: Number,
        require: true
    },
    TotalMarks: {
        type: Number,
        require: true
    },
    Grade: {
        type: String,
        require: true
    },
    TeacherId: {
        type: Number,
        require: true
    }
});
const model = mongoose.model('markDetails', schema, 'markDetails')
module.exports = model;