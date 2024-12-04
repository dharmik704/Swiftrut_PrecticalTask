const properties = require('../models/properties.model');

module.exports.addproprties = async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const addproperty = await properties.create(req.body);
        if(addproperty){
            return res.status(200).json({ msg: 'Property added successfully', status: 1, response: 'success', AddProperty: addproperty });
        }
        else{
            return res.status(400).json({ msg: 'Property is not added!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getproperties = async (req, res) => {
    try {
        const {userId} = req.user._id;
        // console.log(userId)
        const property = await properties.find()
        console.log(property);
        // console.log(addproperty)
        // if(addproperty){
        //     return res.status(200).json({ msg: 'Property added successfully', status: 1, response: 'success', AddProperty: addproperty });
        // }
        // else{
        //     return res.status(400).json({ msg: 'Property is not added!!', status: 0, response: 'error' });
        // }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}