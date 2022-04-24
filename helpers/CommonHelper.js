const crypto = require('crypto');
const moment = require('moment-timezone');
const User = require('../models/User');

module.exports.generatePassword = function (length = 8) {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

module.exports.generateSalt = function (length = 255) {
    return genRandomString(length); /** Gives us salt of length 16 */
}

module.exports.hashPassword = function (userpassword) {
    var salt = genRandomString(255); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return {
        salt: passwordData.salt,
        hash: passwordData.passwordHash
    };
}

module.exports.isPasswordCorrect = function (savedPass, salt, userpassword) {
    var passwordData = sha512(userpassword, salt);
    return savedPass == passwordData.passwordHash;
}


module.exports.sessionrefresh = function (req) {
    var hh = 3600 * 10000000;
    req.session.cookie.expires = new Date(Date.now() + hh);
}

module.exports.errorsValidator = function (object) {
    if (typeof object != "undefined" && Object.keys(object).length > 0) {
        for (var err in object) {
            return object[err][0];
        }
    }
    return '';
}

module.exports.errorsValidate = function (error) {
    // var error = object.validateSync();
    if (typeof error != "undefined" && Object.keys(error).length > 0) {
        var ret_errors = {};
        for (var err in error) {
            ret_errors[err] = error[err][0];
        }
        return (ret_errors);
    }
    return ({});
}

module.exports.errorsAPIValidate = function (error) {
    // var error = object.validateSync();
    if (typeof error != "undefined" && Object.keys(error).length > 0) {
        var ret_errors = "";
        for (var err in error) {
            ret_errors = error[err][0];
            break;
        }
        return (ret_errors);
    }
    return ('');
}




