var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DomainSchema = new Schema({
  name: String,
  characteristics: String,
  image: String,
});

var Domain = mongoose.model('Domain', DomainSchema);

module.exports = Domain;
