const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi)

const Rental = mongoose.model("Rental", new mongoose.Schema({
 Customer: {
     type: new mongoose.Schema({
        name: {
           type: String,
           required: true,
           minlength: 5,
           maxlength: 55
        },
        isGold: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Number,
            required: true,
            min: 5,
            max: 50
        }
     }),
     required: true
 },
 movie: {
     type: new mongoose.Schema({
         title: {
             type: String,
             required: true,
             trim: true,
             minlength: 5,
             maxlength: 55
         },
          dailyRentalRate: {
              type: Number,
              required: true,
              min: 0,
              max: 255
          }
     }),
     required: true
 },
        dateOut: {
            type: Date,
            default: Date.now,
            required: true
        },
        dateReturned: {
            type: Date
        },
        rentalFee: {
            type: Number,
            min: 0
        }
})
)

function validateRental(customerId, movieId){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
     return schema.validate(customerId, movieId)
};


exports.validate = validateRental,
exports.Rental = Rental