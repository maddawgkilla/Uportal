var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    playerID: String,
    yearID: String
});

var Order = module.exports = mongoose.model('Order', OrderSchema);
