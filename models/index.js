var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

// module.exports.Campsite = require("./campsite.js.example");

module.exports.Book = require("./kingdom.js");
module.exports.Author = require("./domain.js");
