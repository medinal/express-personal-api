// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

 var mongoose = require('mongoose');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

//Body-parser:
app.use(bodyParser.urlencoded({ extended: true }));
/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

 // app.get('/api/all', function(req, res){
 //
 // })

 // get all kingdoms
 app.get('/api/kingdoms', function (req, res) {
   // send all books as JSON response
   db.Kingdom.find()
     .populate('domain')
     .exec(function(err, kingdoms){
     if(err){return console.log("index error: "+err);}
     res.json(kingdoms);
   });
});

//get all domains
  app.get('/api/domains', function(req, res) {
    db.Domain.find({}, function(err, domains){
      if(err){return console.log("index error: "+err);}
      res.json(domains);
    });
  })

 // get one kingdom
 app.get('/api/kingdoms/:id', function (req, res) {
   db.Kingdom.findById(req.params.id)
    .populate('domain')
    .exec(function(err, kingdom){
     if(err){return console.log(err);}
     res.json(kingdom);
   });
 });

 // get one domain
 app.get('/api/domains/:id', function (req, res) {
   db.Domain.findById(req.params.id, function(err, domain){
     if(err){return console.log(err);}
     res.json(domain);
   })
 })

 // create new domain
 app.post('/api/domains', function (req, res) {
   var domainName = req.body.name;
   var domainCharacteristics = req.body.characteristics;
   var domainImage = req.body.image;
   db.Domain.create({
     name: domainName,
     characteristics: domainCharacteristics,
     image: domainImage
   }, function(err, domain){
     if(err){return console.log(err);}
     res.json(domain);
   });
 });

 //create new kingdom
 app.post('/api/kingdoms', function(req, res){
   var kingdomName = req.body.name;
   var kingdomCharacteristics = req.body.characteristics;
   var kingdomImage = req.body.image;
   var kingdomDomain = req.body.domain;
   var domainId;
   var kingdomId;
   db.Domain.find({name: kingdomDomain}, function(err, domain){
     if(domain.length === 0 || domain === null){
       db.Domain.create({name: kingdomDomain}, function(err, domain){
         domainId = mongoose.Types.ObjectId(domain._id);
         db.Kingdom.create({name: kingdomName,
           characteristics: kingdomCharacteristics,
           image: kingdomImage,
           domain: domainId}, function(err, kingdom){
             if(err){return console.log(err);}
             db.Kingdom.findById(kingdom._id)
              .populate('domain')
              .exec(function(err, kingdom){
               res.json(kingdom);
             })
           })
       })
     } else {
       domainId = domain[0]._id;
       db.Kingdom.create({name: kingdomName,
         characteristics: kingdomCharacteristics,
         image: kingdomImage,
         domain: domainId}, function(err, kingdom){
           if(err){return console.log(err);}
           db.Kingdom.findById(kingdom._id)
           .populate('domain')
           .exec(function(err, kingdom){
             res.json(kingdom);
           })
         })
     }
   })
 })

 // update kingdom
 app.put('/api/kingdoms/:id', function(req,res){
   var kingdomName = req.body.name;
   var kingdomCharacteristics = req.body.characteristics;
   var kingdomImage = req.body.image;
   var kingdomDomain = req.body.domain;
   var kingdomId = req.params.id;
   var domainId;
   db.Domain.find({name: kingdomDomain}, function(err, domain){
     if(domain.length === 0 || domain === null){
       db.Domain.create({name: kingdomDomain}, function(err, domain){
         domainId = mongoose.Types.ObjectId(domain._id);
         db.Kingdom.findByIdAndUpdate(kingdomId, {name: kingdomName,
           characteristics: kingdomCharacteristics,
           image: kingdomImage,
           domain: domainId}, {new: true}, function(err, kingdom){
             if(err){return console.log(err);}
             db.Kingdom.findById(kingdomId)
              .populate('domain')
              .exec(function(err, kingdom){
               res.json(kingdom);
             })
           })
       })
     } else {
       domainId = domain[0]._id;
       db.Kingdom.findByIdAndUpdate(kingdomId, {name: kingdomName,
         characteristics: kingdomCharacteristics,
         image: kingdomImage,
         domain: domainId}, {new: true}, function(err, kingdom){
           if(err){return console.log(err);}
           db.Kingdom.findById(kingdomId)
           .populate('domain')
           .exec(function(err, kingdom){
             res.json(kingdom);
           })
         })
     }
   })
 });

 //update domain
  app.put('/api/domains/:id', function(req,res){
    var domainName = req.body.name;
    var domainCharacteristics = req.body.characteristics;
    var domainImage = req.body.image;
    var domainId = req.params.id;
    console.log(domainId);
    db.Domain.findByIdAndUpdate(domainId, {
        name: domainName,
        characteristics: domainCharacteristics,
        image: domainImage}, {new: true}, function(err, domain){
          if(err){return console.log(err);}
          res.json(domain);
        })
  });

 // delete kingdom
 app.delete('/api/kingdoms/:id', function (req, res) {
   db.Kingdom.findByIdAndRemove(req.params.id, function(err, kingdom){
     if(err){return console.log(err);}
     res.json(kingdom);
   })
 });

 // delete domain
 app.delete('/api/domains/:id', function (req, res) {
   db.Domain.findByIdAndRemove(req.params.id, function(err, domain){
     if(err){return console.log(err);}
     res.json(domain);
   })
 });


app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/medinal/express-personal-api/blob/master/README.md",
    baseUrl: "http://secure-garden-73192.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/kingdoms", description: "Retrieves all kingdoms"},
      {method: "GET", path: "/api/domains", description: "Retrieves all domains"},
      {method: "GET", path: "/api/kingdoms/:id", description: "Retrieves one kingdoms"},
      {method: "GET", path: "/api/domains/:id", description: "Retrieves one domains"},
      {method: "DELETE", path: "/api/kingdoms/:id", description: "Deletes one kingdoms"},
      {method: "DELETE", path: "/api/domains/:id", description: "Deletes one domains"},
      {method: "POST", path: "/api/kingdoms", description: "Uses the body text to create a new kingdom"},
      {method: "POST", path: "/api/domains", description: "Uses the body text to create a new domain"},
      {method: "PUT", path: "/api/kingdoms/:id", description: "Uses the body text to edit an existing kingdom"},
      {method: "PUT", path: "/api/domains/:id", description: "Uses the body text to edit an existing domain"}
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
