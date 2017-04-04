var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//Register
router.get('/register', function(req, res) {
    res.render("register");
});

//Login
router.get('/login', function(req, res) {
    res.render("login");
});

//Register User
router.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, createdUser) {
        if (err) {
            console.log(err);
            req.flash("error", err.message)
            res.redirect("/users/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to Uportal " + createdUser.username);
                res.redirect("/");
            });
        }       
    });
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}), function() {});

router.get('/logout', function(req,res) {
    req.logout();
    req.flash('success', "You are logged out");
    res.redirect("/users/login");
});

module.exports = router;