const express = require('express');
const propertyctrl = require('../controllers/propertycontroller');

const routes = express.Router();

routes.post('/addproperties', propertyctrl.addproprties);
routes.get('/getproperties', propertyctrl.getproperties);
// routes.post('/logout', userctrl.logout);

module.exports = routes;