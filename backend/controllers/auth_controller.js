const User = require("../models/user");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const hashedPass = await argon.hash(password);

        const user = await User.create(
            {name, email, password: hashedPass, role}
        );

        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.login = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Invalid email"});

    const passMatch = await argon.verify(user.password, password);

    if(!passMatch) return res.status(400).json({message: "Invalid password"});

    const token = jwt.sign(
        {id: user._id, role: user.role},
        "SecretTokenForAuth",
        {expiresIn: "1d"}
    );

    res.json({token});
}