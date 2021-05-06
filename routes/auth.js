const {User } = require("../model/user");
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("Joi");
const bcrypt = require("bcrypt");
const _ = require('lodash'); 


router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword= await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)  return res.status(400).send("Invalid email or password.");

  const token = user.generateUserAuthToken();
  res.send(token);

});
function validate(email, password) {
    const schema = Joi.object({
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
         });
        return schema.validate(email, password);

};
module.exports = router;
