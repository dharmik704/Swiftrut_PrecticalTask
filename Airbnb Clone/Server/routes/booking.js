const express = require('express');
const bookingctrl = require('../controllers/bookingcontroller');

const routes = express.Router();

routes.post('/bookproperty/:id', bookingctrl.bookproperty);
// routes.get('/getbookproperty', bookingctrl.getbookedproperty);

module.exports = routes;