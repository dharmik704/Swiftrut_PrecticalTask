const Expense = require('../models/expense.model');
const moment = require('moment');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const csv = require('csvtojson');

module.exports.createExpense = async (req, res) => {
    try {
        const paymentmethode = ['Cash', 'Credit'];
        const formattedDate = moment(req.body.date, "DD/MM/YYYY").format('ll');
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        req.body.date = formattedDate;
        req.body.userId = req.user._id;
        if(!paymentmethode.includes(req.body.payment_method)){
            return res.status(400).json({ msg: 'Payment mathode is not accepted!! you enter only: Cash or Credit', status: 0, response: 'error' });
        }
        const createExpense = await Expense.create(req.body);
        if(createExpense){
            return res.status(200).json({ msg: 'Expense create successfully', status: 1, response: 'success', YourExpense: createExpense });
        }
        else{
            return res.status(400).json({ msg: 'Expense is not created!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallExpense = async (req, res) => {
    try {
        const allExpense = await Expense.find({userId: req.user._id}).sort({_id: -1});
        if(allExpense){
            return res.status(200).json({ msg: 'Your all Expense', status: 1, response: 'success', AllExpense: allExpense });
        }
        else{
            return res.status(400).json({ msg: 'Expense is not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}
