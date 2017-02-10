var db = require('./models');

var domains_list = [
  {
    name: "Bacteria",
    characteristics: "Cells lacking a nucleus with similarities to Archaea, but with different metabolic pathways.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/EscherichiaColi_NIAID.jpg",
  },
  {
    name: "Eukarya",
    characteristics: "Cells lacking with a nucleus",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Eukaryota_diversity_2.jpg",
  },
  {
    name: "Archaea",
    characteristics: "Cells lacking a nucleus with eukaryotic-like enzymes for transcription and translation",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Halobacteria.jpg",
  }
];

var kingdoms_list = [
  {
    name: "Plantae",
    characteristics: "Autotrophic organisms with cell-walls.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Diversity_of_plants_image_version_5.png/440px-Diversity_of_plants_image_version_5.png",
    domain: "Eukarya"

  },
  {
    name: "Animalia",
    characteristics: "Multicellular organisms that are heterotrophs.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Animal_diversity.png",
    domain: "Eukarya"
  }
];

// remove all records that match {} -- which means remove ALL records
db.Domain.remove({}, function(err, domains){
  console.log('removed all domains');
  db.Domain.create(domains_list, function(err, domains){
    if(err){console.log(err);
    return;
  }
  console.log('recreated all domains');
  console.log("created", domains.length, "domains");

  db.Kingdom.remove({}, function(err,kingdoms){
    console.log('removed all kingdoms');
    kingdoms_list.forEach(function (kingdomData) {
      var kingdom = new db.Kingdom({
        name: kingdomData.name,
        characteristics: kingdomData.characteristics,
        image: kingdomData.image
      });
      db.Domain.findOne({name: kingdomData.domain}, function (err, foundDomain){
        console.log('found domain ' + foundDomain.name + ' for kingdom ' + kingdom.name);
        if(err){
          console.log(err);
          return;
        }
        kingdom.domain =  foundDomain;
        kingdom.save(function(err, savedKingdom){
          if(err){
            return console.log(err);
          }
          console.log('saved ' + savedKingdom.name + ' in ' + foundDomain.name);
        });
      });
    });
  });
});
});
