// Local variables to call on packages
const express = require("express");
const session = require('express-session');
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Local declare variables
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Inform Express.js to use the [sess] variable
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Require for POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use to load static files from the local public folder
app.use(express.static("public"));

// Set to use the [Routes]
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on http://localhost:' + PORT));
});