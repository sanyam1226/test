var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    avatar: { type: String, required: false, default: "" },
    mobile_number: { type: String, trim: true, required: false, default: "" },
    first_name: { type: String, required: false, default: "" },
    last_name: { type: String, required: false, default: "" },
    date_of_birth: { type: String, required: false, default: "" },
    email: { type: String, required: false, trim: true, default: "" },
    gender: { type: String, required: false, default: "" },//1-male,2-female
    password: { type: String, trim: true, required: false },
    salt: { type: String, trim: true, required: false },
    status: { type: Number, required: true, default: 1 },
},
{ timestamps: true });
module.exports = mongoose.model('User', UserSchema);