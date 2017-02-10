var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DomainSchema = new Schema({
  name: {type: String, default: "none"},
  characteristics: {type: String, default: "none"},
  image: {type: String, default: "#"}
});

var Domain = mongoose.model('Domain', DomainSchema);

module.exports = Domain;
