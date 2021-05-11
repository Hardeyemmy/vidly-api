const winston = require("winston");

module.exports=function(err, req, res, next){
    // log the exception
    winston.log("error", err.message)
    return res.status(500).send("something failed..");
   };