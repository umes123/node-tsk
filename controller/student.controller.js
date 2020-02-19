const student = require("../model/student_schema ");
const mark = require("../model/mark_schema");
const config = require('../config/config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


async function getCount() {
    return student.find().count()
}

async function addMark(token, studentId, TotalMarks) {
    let grade;
    (TotalMarks > 50) ? grade = "Pass" : grade = "Fail";
    let decoded = jwt.verify(token, config.secretKey);
    let newMark = new mark({
        "studentId": studentId,
        "TotalMarks": TotalMarks,
        "Grade": grade,
        "TeacherId": decoded._id

    })
    return await newMark.save()
}

module.exports.addStudent = async function (req, res, next) {
    try {
        const schema = {
            "StudentName": Joi.string().required(),
            "class": Joi.number().required(),
            "Roll": Joi.number().required(),
            "SchoolId": Joi.number().required(),
            "totalMarks": Joi.number().required()
        }
        const result = Joi.validate(req.body, schema);

        if (result.error === null) {
            let studentId = await getCount() + 78;
            let addStudent = new student({
                id: studentId,
                StudentName: req.body.StudentName,
                class: req.body.class,
                Roll: req.body.Roll,
                SchoolId: req.body.SchoolId,
                totalMarks: req.body.totalMarks
            })
            await addStudent.save((err, response) => {
                if (err) {
                    res
                        .status(500)
                        .json({ error: [{ "description": "Failed to add student Details", "additionalInfo": err.errmsg }] })

                } else {
                    addMark(req.headers.access_token, studentId, req.body.totalMarks);
                    res
                        .status(200)
                        .json({ message: "Student Registerd successfuly" })
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

module.exports.getAllStudents = async function (req, res, next) {
    try {
        await student.aggregate([
            { $match: {} },
            {
                $lookup:
                {
                    from: "schoolDetails",
                    localField: "SchoolId",
                    foreignField: "id",
                    as: "schoolDetails"
                }
            },
            {
                $unwind: "$schoolDetails"
            },
            {
                $project: {
                    __v: 0,
                    "schoolDetails.__v": 0,
                    "schoolDetails._id": 0,
                    "schoolDetails.id": 0
                }
            },
            {
                $lookup:
                {
                    from: "schoolLogin",
                    localField: "SchoolId",
                    foreignField: "SchoolId",
                    as: "teacherDetails"
                }
            },
            {
                $unwind: "$teacherDetails"
            },

            {
                $project: {
                    __v: 0,
                    "teacherDetails.__v": 0,
                    "teacherDetails._id": 0,
                    "teacherDetails.id": 0,
                    "teacherDetails.password": 0,
                    "teacherDetails.SchoolId": 0,
                }
            },
            {
                $lookup:
                {
                    from: "markDetails",
                    localField: "id",
                    foreignField: "studentId",
                    as: "markDetails"
                }
            },
            {
                $unwind: "$markDetails"
            },
            {
                $project: {
                    __v: 0,
                    "markDetails.__v": 0,
                    "markDetails._id": 0,
                    "markDetails.id": 0
                }
            }

        ]).exec((err, response) => {
            if (err) {
                res
                    .status(500)
                    .json({ error: [{ "description": "Unable to fetch Records from DB", "additionalInfo": null }] })
            } else {
                res
                    .status(200)
                    .json({ Users: response })
            }
        })
    } catch (error) {
        console.log(error);

    }

};

