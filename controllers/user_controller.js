const UserModel = require("./../database/models/user_model");
// const jwt = require("jsonwebtoken");

async function create(req, res) {
    const { email, password, name } = req.body;
    const user = await UserModel.create({ email, password, name});
    res.redirect(`/user/${user._id}`);
}

async function index(req, res) {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    res.json(user);
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    const valid = await user.verifyPassword(password);

    if (!valid) {
        res.redirect("/");
    }
    res.redirect(`/user/${user._id}`);
}

async function home_page(req, res) {
    const user = await UserModel.find();
    res.json(user);
}

async function update(req, res) {
    const { id } = req.params;
    const { email, password, name } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, {email, password, name});

    res.redirect(`/user/${user._id}`);
}

module.exports = {
    create,
    index,
    home_page,
    login,
    update
}