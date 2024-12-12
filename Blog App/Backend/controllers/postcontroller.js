const Post = require('../models/post.model');
const User = require('../models/user.model');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.createpost = async (req, res) => {
    try {
        var img = ""
        if(req.file){
            const userId = req.user._id;
            img = Post.ipath + '/' + req.file.filename;
            req.body.createAt = moment().format('LLL');
            req.body.updateAt = moment().format('LLL');
            req.body.image = img;
            req.body.userId = userId;
            const createpost = await Post.create(req.body);
            if(createpost){
                return res.status(200).json({ msg: 'Post created successfully', status: 1, response: 'success', YourPost: createpost });
            }
            else{
                return res.status(400).json({ msg: 'Post is not created!!', status: 0, response: 'error' });
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

