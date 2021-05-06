const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
         },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true
    },     
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    }

}));

function validateUser(name, email, password) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
         });
        return schema.validate(name, email, password);

};

module.exports.validate = validateUser;
module.exports.User = User;
