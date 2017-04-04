var express = require("express");
var router = express.Router();
var Csvfile = require("../models/csvfile");
var Order = require("../models/order");
var middleware = require("../middleware/index");
const fs = require('fs');
var csvtojson = require('csvtojson');
const tableify = require('tableify');
var PaidOrder = require('../models/paidorder');

router.get('/', middleware.ensureAuthenticated, function(req, res) {
    Csvfile.find('', function(err, foundFiles) {
        res.render('fileview', {foundFiles: foundFiles});
    });
});

router.get('/orders', middleware.ensureAuthenticated, function(req, res) {
    Order.find('', function(err, foundOrders) {
        if(err) {
            console.log(err);
        } else {
            res.render('orders', {orders: foundOrders});
        }
    });
});

router.get('/paid', middleware.ensureAuthenticated, function(req, res) {
    PaidOrder.find('', function(err, foundPaidOrders) {
        if(err) {
            console.log(err);
        } else {
            res.render('paidorders', {paidOrders: foundPaidOrders});
        }
    });
});

router.get('/:file', middleware.ensureAuthenticated, function(req, res) {
    var filepath = "./public/uploads/orderfiles/"+req.params.file;
    csvtojson().fromFile(filepath).on('json', (jsonObj) => {
        Order.create(jsonObj, function(err, createdEntry) {
            if(err) {
                console.log(err);
            } else {
                console.log(createdEntry);
            }
        });
    }).on('done', (err) => {
        req.flash("success", "Orders Imported Successfully");
        res.redirect('/files/orders');
    });
});

router.post('/paid', middleware.ensureAuthenticated, function(req, res) {
    var ids = req.body.ids;
    console.log(ids);
    for(var a = 0; a < ids.length; a++) {
        Order.findByIdAndRemove(ids[a], function(err, removedOrder) {
            if(err) {
                console.log(err);
            } else {
                PaidOrder.create({ playerID: removedOrder.playerID, yearID: removedOrder.yearID }, function(err, createdPaidOrder) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("created Paid Order "+createdPaidOrder);
                    }
                });
            }
        });
    }
    req.flash('success', 'Added paid Orders Successfully');
    res.redirect("back");
});



module.exports = router;
