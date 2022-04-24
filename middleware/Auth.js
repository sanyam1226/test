const jwt = require('jsonwebtoken');

module.exports.login = function (req, res, next) {
    try {
        const decoded = jwt.verify(req.headers.token, "secret");
        req.userdata = decoded;
        next();
    } catch (error) {
        return response(req, res);
    }
};

function response(req, res) {
    return res.status(200).json({ status: 2, message: trans.lang('message.auth_fail') });
}



