const mongoose = require("mongoose");
const Joi = require("Joi");


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
         }
    });

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(name) {
    const schema = Joi.object({
        name: Joi.string()
                   .min(3)
                   .required()
         });
        return schema.validate(name);

};

module.exports.validate = validateGenre;
module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;