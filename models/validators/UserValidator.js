let Validator = require('validatorjs');

module.exports.signUp = function (data) {
    let rules = {
        email: "required",
        password: "required"
    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};

module.exports.login = function (data) {
    let rules = {
        email: "required",
        password: "required",
    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};

module.exports.updateProfile = function (data) {
    let rules = {
        first_name: "required",
        last_name: "required",
    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};



