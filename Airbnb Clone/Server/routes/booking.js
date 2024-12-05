const express = require('express');
const bookingctrl = require('../controllers/bookingcontroller');

const routes = express.Router();

routes.post('/bookproperty', bookingctrl.bookproperty);
// routes.get('/getbookproperty', bookingctrl.getbookedproperty);

module.exports = routes;