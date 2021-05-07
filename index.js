const dbDebugger = require('debug')('app:db');
const startupDebugger = require('debug')('app:startup');
const config = require("config");
const express = require("express");
const logger = require("./logger");
const authenticator = require("./authenticator");
const genre = require("./routes/genre")
const home = require('./middleware/home');
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const Joi = require("Joi");
const customer = require("./routes/customers");
const movie = require('./routes/movie');
const rental = require('./routes/rental');
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

mongoose.connect("mongodb://localhost/vidly-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(() => console.log("Connected to the mongoDB..."))
.catch(() => console.log("Could not connect to mongoDB..."))

app.set('view engine', 'pug');
app.set('views', './views'); //default

//environment
/** console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`); **/

if(app.get('env') === "development"){
    app.use(morgan("tiny"));
    startupDebugger("Morgan enabled...");
};

 //database work somewhere
 dbDebugger("connected to the database...");


if (!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1)
}

//custom middleware
app.use(logger);
app.use(authenticator);

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/api/vidly/genres', genre);
app.use('/api/vidly/customers', customer);
app.use('/api/vidly/movies', movie);
app.use('/api/vidly/rentals', rental)
app.use('/', home);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

//third party middleware
app.use(morgan("tiny"));
app.use(helmet());


  




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
