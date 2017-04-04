var express = require("express");
var router = express.Router();
var path = require('path');
var multer = require("multer");
var orderStorage = multer.diskStorage({
    destination: './public/uploads/orderfiles',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var vendorStorage = multer.diskStorage({
    destination: './public/uploads/vendorfiles',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadOrder = multer({ storage: orderStorage });
var uploadVendor = multer({ storage: vendorStorage });
var fs = require('fs');
var Csvfile = require('../models/csvfile');

//Get Homepage
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('index');
});

//Save Order File
router.post('/order-upload', [ensureAuthenticated, uploadOrder.single('orderfile') ], function(req, res){
    console.log(req.file);
    Csvfile.create(req.file, function(err, savedfile) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            console.log(savedfile);
            req.flash("success", "Order File saved successfully");
            res.redirect('back');
        }
    });
});

//Save Vendor File
router.post('/vendor-upload', [ensureAuthenticated, uploadVendor.single('vendorfile') ], function(req, res){
    Csvfile.create(req.file, function(err, savedfile) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            console.log(savedfile);
            req.flash("success", "Vendor file saved successfully");
            res.redirect('back');
        }
    });
});

router.get('/test', function(req, res) {
    res.render('test');
});

//Middleware
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You are not logged in');
        res.redirect("/users/login");
    }
}

module.exports = router;
