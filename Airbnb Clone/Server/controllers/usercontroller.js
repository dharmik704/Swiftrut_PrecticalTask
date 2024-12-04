const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const User = require('../models/user.model');
const Property = require('../models/properties.model');

module.exports.signup = async (req, res) => {
    try{
        const { email, password, username } = req.body;
        if(!email || !password || !username){
            return res.status(400).json({ msg: 'All fields are required', status: 0, response: 'error' });
        }
        const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!validemail.test(email)){
            return res.status(400).json({ msg: 'Invalid email', status: 0, response: 'error' });
        }

        if(password.length < 6 || password.length > 6){
            return res.status(400).json({ msg: 'Password must be at least 6 characters', status: 0, response: 'error' });
        }

        const exitingemail = await User.findOne({email: email});
        if(exitingemail){
            return res.status(400).json({ msg: 'Email is alrady exist', status: 0, response: 'error' });
        }

        const exitingusername = await User.findOne({username: username});
        if(exitingusername){
            return res.status(400).json({ msg: 'Username is alrady exist', status: 0, response: 'error' });
        }

        const bcryptpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: bcryptpassword,
        });

        const userdata = await newUser.save();
        if(userdata){
            return res.status(200).json({ msg: 'Registred successfully', status: 1, response: 'success', UserData: userdata });
        }
        else{
            return res.status(400).json({ msg: 'You are not registred!! Somthin wrong..', status: 0, response: 'error' });
        }

    }
    catch(err){
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.login = async (req, res) => {
    try {
        const userdata = await User.findOne({email: req.body.email})
        const payload = {
            email: req.body.email,
            password: req.body.password,
            userdata
        }
        let checkemail = await User.findOne({ email: req.body.email });
        if (checkemail) {
            let comparepass = await bcrypt.compare(payload.password, checkemail.password);
            if (comparepass) {
                const token = generateToken(payload);
                res.cookie('airbnb-jwt', token);
                return res.status(200).json({ msg: 'Login Successfully', status: 1, response: 'success', Userdata: userdata });
            }
            else {
                return res.status(400).json({ msg: 'Password is not valid', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Email is not valid', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('airbnb-jwt');
        return res.status(200).json({ msg: 'Logged Out successfully', status: 1, response: 'success' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.bookproperty = async (req, res) => {
    try {
        const userId = req.user._id;
        const { propertyId } = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({ msg: 'User Not Found', status: 0, response: 'error' });
        }

        if(!user.bookings){
            // user.bookings.(propertyId);
            const savdata = await user.save({bookings: propertyId});
            console.log(savdata);
            return res.status(200).json({ msg: 'Property Booked', status: 1, response: 'success' });
        }

        const property = await Property.findById(propertyId);
        if(property){
            return res.status(200).json({ msg: 'Bokked Properties', status: 1, response: 'success', BookProperties: property });
        }
        else{
            return res.status(400).json({ msg: 'Properties Is Not Found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getbookedproperty = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate({
            path: 'bookings',
            model: 'Properties',
        }).exec();

        const bookproperty = user.purchased;
        return res.status(200).json({ msg: 'Bokked Properties', status: 1, response: 'success', BookProperties: bookproperty });

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}