var middlewareObj = {};

//Middleware
middlewareObj.ensureAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You are not logged in');
        res.redirect("/users/login");
    }
}

module.exports = middlewareObj;
