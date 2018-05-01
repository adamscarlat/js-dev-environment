var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//defines the callbacks the auth router uses
var authController = function(User) {
    
    //register a new user if email is unique
    var registerNewUser = function(req, res) {
        console.log('registering new user...')
        userExists(req.body.email)
        .then(user => {
            if (user) return res.status(400).send("email is already in use");
            registerUserHelper(req, res);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send("There was a problem. Try again later")
        })
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
            if (!user) return res.status(401).send({ auth: false, message: "Bad login" });

            //compare input password to hashed value
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    }
    
    //check if user exists by email. Wrap in a promise to have the 
    //posibility to chain to another async method.
    function userExists(email) {
        return new Promise(function (onSuccess, onReject) {
            User.findOne({email: email}, function(err, user) {
                if (err) {
                    console.log(err) 
                    onReject(err);
                } else {
                    onSuccess(user);
                }
            })
        })
    }

    //create and save a new user. return a 200 response if successful.
    function registerUserHelper(req, res) {
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

    return {
        registerNewUser: registerNewUser,
        getConnectionStatus: getConnectionStatus,
        loginUser: loginUser
    }

}

module.exports = authController;