var express = require('express');
var bodyParser = require('body-parser');
var verifyTokenMiddleware = require('../middleware/authMiddleware')().verifyToken

var routes = function(User) {
	var router = express.Router();
	router.use(bodyParser.urlencoded({ extended: false })); 
	router.use(bodyParser.json());

	var authController = require('../controllers/authController')(User);

	//register new user
	router.post('/register', authController.registerNewUser);

	//connection status
	router.get('/me', verifyTokenMiddleware, authController.getConnectionStatus);

	//login user
	router.post('/login', authController.loginUser);

	return router;
}

module.exports = routes;