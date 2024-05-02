const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {

        return res.status(400).json({ "message": "All fields required" });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    console.log(`User: ${user.name}`);
    user.save().then(() => {
        const token = user.generateJwt();
        console.log(`Token: ${token}`);
        res.status(200).json({ token });
    }).catch(err => {
        console.log("Error: saving token");
        res.status(501).json(err); // Changed to 500 to reflect server errors
    })
};


const login = (req, res) => {
    console.log("Login route hit");
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }
    
    passport.authenticate('local', (err, user, info) => {
        //let token;
        console.log(`User: ${user}`);
        if (err) {
            console.log("There was an error authenticating the user: " + err);
            return res.status(404).json(err);
        }
        if (user) {
            console.log("GenerateJwt hit");
            const token = user.generateJwt();
            console.log("Generated token: " + token)
            res.status(200).json({ token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};