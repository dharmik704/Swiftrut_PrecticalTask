const Recipe = require('../models/recipe.model');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.createrecipe = async (req, res) => {
    try {
        var img = ""
        if(req.file){
            const userId = req.user._id;
            img = Recipe.ipath + '/' + req.file.filename;
            req.body.createAt = moment().format('LLL');
            req.body.updateAt = moment().format('LLL');
            req.body.image = img;
            req.body.userId = userId;
            const createrecipe = await Recipe.create(req.body);
            if(createrecipe){
                return res.status(200).json({ msg: 'Recipe is created successfully', status: 1, response: 'success', YourPost: createrecipe });
            }
            else{
                return res.status(400).json({ msg: 'Recipe is not created!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'File is not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}