let Validator = require('validatorjs');

module.exports.store = function (req) {
    var data = req;
    let rules = {
        title: "required",
    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};

