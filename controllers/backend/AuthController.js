const User = require('../../models/User');

exports.Signup = function (req, res, next) {
    User.Signup(req, res, function (data) {
        res.status(200).json(data);
    });
};

exports.Login = function (req, res, next) {
    User.Login(req, res, function (data) {
        res.status(200).json(data);
    });
};

exports.Profile = function (req, res, next) {
    var user_id = req.userdata.user_id;
    User.Profile(req, user_id, res, function (data) {
        res.status(200).json(data);
    });
};

exports.UpdateProfile = function (req, res, next) {
    var user_id = req.userdata.user_id;
    User.UpdateProfile(req, user_id, res, function (data) {
        res.status(200).json(data);
    });
};