
const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
         },
        isGold: { 
            type: Boolean,
            required: true,
            default: false
        },
        
        phone: {
            type: Number,
            required: true,
            min: 5
        }

    })
)


function validateCustomer(name, phone, isGold) {
    const schema = Joi.object({
        name: Joi.string()
                   .min(3)
                   .required(),
        phone: Joi.number()
                  .min(5)
                  .required(),
        isGold: Joi.boolean()
                   
         });
        return schema.validate(name, phone, isGold);

};

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;