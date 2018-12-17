const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");
const UserController = require("./../controllers/user_controller");

router.get("/", UserController.home_page);

router.post("/register", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required()
    }
}), UserController.create);

router.post("/login", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), UserController.generateJWT);

router.get("/user/", passport.authenticate('jwt', {session: false}), UserController.index);

router.patch("/user/:id/update", UserController.update);

module.exports = router;