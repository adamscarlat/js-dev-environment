var express = require('express');

var routes = function(User) {

    var router = express.Router();
    var userController = require('../controllers/userController.js')(User);

    // CREATES A NEW USER
    router.post('/', userController.addNewUser);

    // RETURNS ALL THE USERS IN THE DATABASE
    router.get('/', userController.get);

    // GETS A SINGLE USER FROM THE DATABASE
    router.get('/:id', userController.getById);

    // DELETES A USER FROM THE DATABASE
    router.delete('/:id', userController.deleteUser)

    // UPDATES A SINGLE USER IN THE DATABASE
    router.put('/:id', userController.updateUser);

    return router;
}

module.exports = routes;