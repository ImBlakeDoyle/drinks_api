const express = require("express");
// const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));

app.use(require("./routes"));

module.exports = app;