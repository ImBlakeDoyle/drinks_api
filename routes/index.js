const express = require("express");
const router = express.Router();
// const { celebrate, Joi } = require("celebrate");
// const passport = require("passport");
const UserController = require("./../controllers/user_controller");

router.get("/", UserController.home_page);

router.post("/register", UserController.create);

router.post("/login", UserController.login);

router.get("/user/:id", UserController.index);

router.patch("/user/:id/update", UserController.update);

module.exports = router;