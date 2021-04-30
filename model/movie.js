const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 0,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true

    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

}));

function validateMovie(title, genreId, numberInStock, dailyRentalRate) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
         });
        return schema.validate(title, genreId, numberInStock, dailyRentalRate);

};

exports.validate = validateMovie;
exports.Movie = Movie;