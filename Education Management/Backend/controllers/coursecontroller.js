const Course = require('../models/course.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports.createcourse = async (req, res) => {
    try {
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        req.body.startDate = moment(req.body.startDate, "DD/MM/YYYY").format('ll');
        req.body.endDate = moment(req.body.endDate, "DD/MM/YYYY").format('ll');
        const createcourse = await Course.create(req.body);
        if(createcourse){
            return res.status(200).json({ msg: 'Course is created successfully', status: 1, response: 'success', YourCourse: createcourse });
        }
        else{
            return res.status(400).json({ msg: 'Course is not created!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallcourse = async (req, res) => {
    try {
        const allcourse = await Course.find().sort({_id: -1});
        if(allcourse){
            return res.status(200).json({ msg: 'Your all Course', status: 1, response: 'success', AllCourse: allcourse });
        }
        else{
            return res.status(400).json({ msg: 'Course are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updatecourse = async (req, res) => {
    try {
        const coursedata = await Course.findById(req.params.id);
        if(coursedata){
            req.body.startDate = moment(req.body.startDate, "DD/MM/YYYY").format('ll');
            req.body.endDate = moment(req.body.endDate, "DD/MM/YYYY").format('ll');
            req.body.updateAt = moment().format('LLL');
            const updatecourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updatecourse){
                return res.status(200).json({ msg: 'Course is updated successfully', status: 1, response: 'success', UpdatedCourse: updatecourse });
            }
            else{
                return res.status(400).json({ msg: 'Course is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Course is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removecourse = async (req, res) => {
    try {
        const rmvcourse = await Course.findByIdAndDelete(req.params.id);
        if(rmvcourse){
            return res.status(200).json({ msg: 'Course is removed successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Course is not removed!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.assignedteacher = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const { teacherId } = req.body;
        if(!course){
            return res.status(400).json({ msg: 'Course is not found!!', status: 0, response: 'error' });
        }
        course.assignedTeacher = teacherId;
        if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({
                msg: 'Teacher ID must be a valid ObjectId',
                status: 0,
                response: 'error'
            });
        }
        const updatedCourse = await course.save();
        if(updatedCourse){
            return res.status(200).json({ msg: 'Teacher is successfully assigned for this course', status: 1, response: 'success', UpdatedCourse: updatedCourse });
        }
        else{
            return res.status(400).json({ msg: 'Teacher is not assigned for this course!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.enrollestudent = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const { studentId } = req.body;
        if(!course){
            return res.status(400).json({ msg: 'Course is not found!!', status: 0, response: 'error' });
        }
        course.enrolledStudents = studentId;
        if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({
                msg: 'Student ID must be a valid ObjectId',
                status: 0,
                response: 'error'
            });
        }
        const updatedCourse = await course.save();
        if(updatedCourse){
            return res.status(200).json({ msg: 'Student is successfully enrollment this course', status: 1, response: 'success', UpdatedCourse: updatedCourse });
        }
        else{
            return res.status(400).json({ msg: 'Teacher is not enrollment this course!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}