const Task = require('../models/task.model');
const User = require('../models/user.model');
const moment = require('moment');
const nodemailer = require('nodemailer');
const { info } = require("console");
const path = require('path');

module.exports.createtask = async (req, res) => {
    try {
        const userId = req.user._id;
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        const createtask = await Task.create(req.body);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: "dharmikchhodvdiya@gmail.com",
              pass: "wpeyeoaukdmcwhiv",
            },
        });
        if(createtask){
            await User.findByIdAndUpdate(userId, {
                $push: {
                    tasks: createtask._id,
                },
            });
            if(info){
                const info = await transporter.sendMail({
                    from: 'dharmikchhodvdiya@gmail.com', // sender address
                    to: req.user.email, // list of receivers
                    subject: `The New Task Is Ready`, // Subject line
                    text: "Hello world?", // plain text body
                    html: `<p> This Email is Informed to your New Task is Successfully Created and you Take Some Actions on your Task. More Information is Showen on your Deskbord.</p>`, // html body
                });
            }
            return res.status(200).json({ msg: 'Task added successfully', status: 1, response: 'success', YourTask: createtask });
        }
        else{
            return res.status(400).json({ msg: 'Task is not added!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getalltask = async (req, res) => {
    try {
        const userId = req.user._id;
        const userdata = await User.findById(userId).populate({
            path: 'tasks',
            options: { sort : {createAt: -1 }},
        });
        if(userdata){
            return res.status(200).json({ msg: 'Your All Tasks', status: 1, response: 'success', AllTasks: userdata.tasks });
        }
        else{
            return res.status(400).json({ msg: 'Tasks are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removetask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const rmvtask = await Task.findByIdAndDelete(id);
        if(rmvtask){
            await User.findByIdAndUpdate(userId, {
                $pull: {
                    tasks: id,
                },
            });
            return res.status(200).json({ msg: 'Task is deleted successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Task is not deleted!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

