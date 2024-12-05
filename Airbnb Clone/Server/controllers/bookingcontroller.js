const Property = require('../models/properties.model');
const Booking = require('../models/booking.model');

module.exports.bookproperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if(property.ownerId.toString() !== req.user._id){
            return res.status(400).json({ msg: 'Not authorized to update this property!!', status: 0, response: 'error' });
        }

        // const property = await Property.findById(propertyId);
        // if(property){
        //     return res.status(200).json({ msg: 'Bokked Properties', status: 1, response: 'success', BookProperties: property });
        // }
        // else{
        //     return res.status(400).json({ msg: 'Properties Is Not Found', status: 0, response: 'error' });
        // }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}