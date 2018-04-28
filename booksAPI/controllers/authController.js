var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//defines the callbacks the auth router uses
var authController = function(User) {
    
    //register a new user 
    var registerNewUser = function(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        //create new user and save in DB
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")

            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    }

    //get the connection status given a token 
    var getConnectionStatus = function(req, res) {
        //return user object (without password) to caller
        User.findById(req.userId, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            user = user.toJSON();
            delete user.password;

            res.status(200).send(user);
        })
    }

    //login user and generate a token 
    var loginUser = function(req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');

            //compare input password to hashed value
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    }
    

    return {
        registerNewUser: registerNewUser,
        getConnectionStatus: getConnectionStatus,
        loginUser: loginUser
    }

}

module.exports = authController;