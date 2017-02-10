var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DomainSchema = new Schema({
  characteristics: String,
  image: String,
});

var Domain = mongoose.model('Domain', DomainSchema);

module.exports = Domain;
