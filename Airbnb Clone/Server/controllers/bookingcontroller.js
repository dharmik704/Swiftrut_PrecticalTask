const Property = require('../models/properties.model');
const Booking = require('../models/booking.model');
const moment = require('moment');

module.exports.bookproperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if(property){
            if(property.ownerId.toString() === req.user._id){
                return res.status(400).json({ msg: 'Not authorized to booking this property!!', status: 0, response: 'error' });
            }
            req.body.propertyId = property._id;
            req.body.userId = req.user._id;
            req.body.startDate = moment(req.body.startDate, "DD/MM/YYYY").format('ll');
            req.body.endDate = moment(req.body.endDate, "DD/MM/YYYY").format('ll');
            const booking = await Booking.create(req.body);
            if(booking){
                return res.status(200).json({ msg: 'Property is successfully bokked', status: 1, response: 'success', BookedProperty: booking });
            }
            else{
                return res.status(400).json({ msg: 'Property is not bokked!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Property is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}