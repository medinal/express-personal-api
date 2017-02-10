var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var KingdomSchema = new Schema({
  characteristics: String,
  image: String,
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'Domain'
  },
});

var Kingdom = mongoose.model('Kingdom', KingdomSchema);

module.exports = Kingdom;
