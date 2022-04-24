const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const env = require("node-env-file");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const moment = require('moment');

module.exports = function (mongoose) {
  env("./.env");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use('/public', express.static('public'));

  var main_config = require('./config/main')(process.env.PORT);
  app.locals = main_config;
  global.base_url = process.env.BASE_URL;
  global.locals = main_config;
  global.moment = moment;
  global.__dirname = __dirname;
  global.__lang_path = __dirname + "/" + 'language/';
  global.trans = require('./helpers/LanguageHelper');

  var dd = (new Date());
  var cookieTime = dd.getTime() + (60 * 10e8);
  var session_obj = {
    secret: "frilanx admin",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { expires: new Date(cookieTime), maxAge: cookieTime },
  };
  app.use(session(session_obj));

  app.use(function (req, res, next) {
    global.currentLang = (req.headers.lang == undefined || req.headers.lang == '') ? 'en' : req.headers.lang;
    if (typeof req.session.user != "undefined" && req.session.user._id) {
      res.locals.user = req.session.user;
    }
    next();
  });

  return app;
};
