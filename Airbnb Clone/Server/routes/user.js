const express = require('express');
const userctrl = require('../controllers/usercontroller');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.post('/signup', userctrl.signup);
routes.post('/login', userctrl.login);
routes.post('/logout', userctrl.logout);

routes.post('/bookproperty', jwtAuthMiddleware, userctrl.bookproperty);
routes.get('/getbookproperty', jwtAuthMiddleware, userctrl.getbookedproperty);

module.exports = routes;