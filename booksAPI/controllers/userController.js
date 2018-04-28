//defines the callbacks the user router uses
var userController = function(User) {

    // RETURNS ALL THE USERS IN THE DATABASE
    var get = function(req, res) {
        User.find({}, function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(users);
        });
    }

    // GETS A SINGLE USER FROM THE DATABASE
    var getById = function(req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send(user);
        });
    }

    // DELETES A USER FROM THE DATABASE
    var deleteUser = function(req, res) {
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            res.status(200).send("User: "+ user.name +" was deleted.");
        });
    }

    // UPDATES A SINGLE USER IN THE DATABASE
    var updateUser = function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(user);
        });
    }

    // CREATES A NEW USER
    var addNewUser = function(req, res) {
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
    }

    return {
        get: get,
        getById: getById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        addNewUser: addNewUser
    }

}

module.exports = userController;