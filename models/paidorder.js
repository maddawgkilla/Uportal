var mongoose = require("mongoose");

var PaidOrderSchema = new mongoose.Schema({
    playerID: String,
    yearID: String
});

var PaidOrder = module.exports = mongoose.model('PaidOrder', PaidOrderSchema);
