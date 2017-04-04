var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser =  require("cookie-parser");
var ejs = require("ejs");
// var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Uportal");
var db = mongoose.connection;
var User = require('./models/user');
var index = require("./routes/index");
var users = require("./routes/users");
var files = require("./routes/files");



// Init loginapp
var app = express();

//View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("/orderfile", path.join(__dirname, 'public/uploads/orderfiles')));
// app.use(express.static("/vendorfile", path.join(__dirname, 'public/uploads/vendorfiles')));

//Express session
//Passport Configuration
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Connect flash
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/files', files);

app.listen('3000', 'localhost', function() {
    console.log('Server started on port 3000');
});
