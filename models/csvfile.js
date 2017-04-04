var mongoose = require("mongoose");

var CsvfileSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
});

var Csvfile = module.exports = mongoose.model('Csvfile', CsvfileSchema);