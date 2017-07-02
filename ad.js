var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  pic: { type: String, required: true }
});
var ad = mongoose.model('ad', adSchema);

module.exports = ad;