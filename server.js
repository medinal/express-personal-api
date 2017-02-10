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

 // update kingdom
 app.put('/api/kingdoms/:id', function(req,res){
 // get book id from url params (`req.params`)

 });

 // delete kingdom
 app.delete('/api/kingdoms/:id', function (req, res) {
   // get book id from url params (`req.params`)

 });


app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
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
