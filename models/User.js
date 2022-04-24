const mongoose = require('mongoose');
const User = require('./schemas/User');
const UserValidator = require('./validators/UserValidator');
const CommonHelper = require('../helpers/CommonHelper');
const UploadHelper = require('../helpers/UploadHelper')
const jwt = require('jsonwebtoken');

module.exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        User.findOne().where({ _id: mongoose.Types.ObjectId(id) }).then(async function (data, err) {
            if (!data) {
                resolve(data); return;
            }
            resolve(data);
        });
    });
};

module.exports.getByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        User.findOne().where({ email: email }).then(async function (data, err) {
            if (!data) {
                resolve(data); return;
            }
            resolve(data);
        });
    });
};

module.exports.Signup = async function (req, res, next) {
    try {
        const self = this;
        const isValid = UserValidator.signUp(req.body);
        if (isValid.fails()) {
            return next({ status: 0, message: CommonHelper.errorsValidator(isValid.errors.errors) });
        }
        const isExistsUser = await self.getByEmail(req.body.email);
        var salt_pass = CommonHelper.hashPassword(req.body.password);
        if (!isExistsUser) {
            const userObjData = new User({
                email: req.body.email,
                password: salt_pass.hash,
                salt: salt_pass.salt,
            });
            userObjData.save(async function (error, respData) {
                if (respData) {
                    return next({ status: 1, message: trans.lang('message.loaded_success') });
                } else {
                    return next({ status: 0, message: trans.lang('message.something_went_wrong') });
                }
            });
        } else {
            return next({ status: 0, message: trans.lang('message.email_already_exists') });
        }

    } catch (error) {
        console.log('check error', error);
    }
};

module.exports.Login = function (req, res, next) {
    try {
        const isValid = UserValidator.login(req.body);
        if (isValid.fails()) {
            return next({ status: 0, message: CommonHelper.errorsValidator(isValid.errors.errors) });
        }
        const password = req.body.password;
        const where = { email: req.body.email, status: 1 };
        User.findOne().where(where).then(async function (data, err) {
            if (err) {
                return next({ status: 0, message: trans.lang('message.something_went_wrong') })
            }
            if (!data) {
                return next({ status: 0, message: trans.lang('message.invalid_username') });
            }
            const is_correct = CommonHelper.isPasswordCorrect(data.password, data.salt, password + "");
            const token = jwt.sign({ user_id: data._id }, "secret", { expiresIn: locals.tokenExpDays });
            if (is_correct) {
                req.session.user = data;
                CommonHelper.sessionrefresh(req);
                return next({ status: 1, message: "Login success", token: token, slug: req.session.user.role_slug });
            } else {
                return next({ status: 0, message: trans.lang('message.auth_fail') })
            }
        });
    } catch (error) {
        console.log('check error', error);
    }
};

module.exports.Profile = async function (req, user_id, res, next) {
    try {
        const self = this;
        const userData = await self.getById(user_id);
        if (!userData) {
            return next({ status: 0, message: trans.lang('message.something_went_wrong') });
        }
        return next({ status: 1, message: trans.lang('message.loaded_success'), data: userData });
    } catch (error) {
        console.log('check error', error);
    }
};

module.exports.UpdateProfile = async function (req, user_id, res, next) {
    try {
        req.body.file_data = [
            { file_name: 'avatar', file_path: locals.user_avatar.base_path },
        ];
        var respUpload = await UploadHelper.uploadMultiFile(req, res);
        if (respUpload.error != undefined) {
            return next({ status: 0, message: respUpload.message })
        }
        const _body = respUpload.body;
        const isValid = UserValidator.updateProfile(_body);
        if (isValid.fails()) {
            await UploadHelper.removeMultiPathImages(respUpload.files, ['avatar']);
            return next({ status: 0, message: CommonHelper.errorsValidator(isValid.errors.errors) });
        }
        let data = {};
        data.first_name = _body.first_name;
        data.last_name = _body.last_name;
        data.date_of_birth = _body.date_of_birth;
        data.gender = _body.gender;
        if (respUpload.files.avatar != undefined && respUpload.files.avatar[0] != undefined && respUpload.files.avatar[0].filename != undefined) {
            data.avatar = respUpload.files.avatar[0].filename;
        }
        User.findOneAndUpdate({ _id: user_id }, data).then(async function (data, err) {
            if (err) {
                return next({ status: 0, message: trans.lang('message.something_went_wrong') });
            }
            if (!data) {
                return next({ status: 0, message: trans.lang('message.user.not_found') });
            } else {
                return next({ status: 1, message: "profile updated"});
            }
        });
    } catch (error) {
        console.log('check error', error);
    }
};
