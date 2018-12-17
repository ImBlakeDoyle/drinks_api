const UserModel = require("./../database/models/user_model");
const jwt = require("jsonwebtoken");

async function create(req, res) {
    const { email, password, name } = req.body;
    const user = await UserModel.create({ email, password, name});
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
    // res.redirect(`/user/${user._id}`);
    res.json(token);
}

async function index(req, res) {
    res.json(req.user);
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

function generateJWT(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.json(token);
}

module.exports = {
    create,
    index,
    home_page,
    login,
    update,
    generateJWT
}