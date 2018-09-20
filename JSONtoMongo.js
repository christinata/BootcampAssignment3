'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */

mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

fs.readFile('./listings.json', 'utf8', function (err, data) {
var data = JSON.parse(data);
  for (var i = 0; i < data.entries.length; i++){
    var line = data.entries[i];
    var lines = new Listing({
                     code: line.code,
                     name: line.name,
                     coordinates: line.coordinates,
                     address: line.address
                   });
/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

 lines.save(function(err) {
      if (err) throw err;
      else
      console.log("created entry");
    });
    }
  });
 mongoose.connect(config.db.uri).close;

