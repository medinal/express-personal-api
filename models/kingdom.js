var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var KingdomSchema = new Schema({
  name: {type: String, default: "none"},
  characteristics: {type:String, default: "none"},
  image: {type: String, default: "#"},
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'Domain',
  },
});

var Kingdom = mongoose.model('Kingdom', KingdomSchema);

module.exports = Kingdom;
