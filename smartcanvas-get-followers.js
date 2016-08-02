"use strict";

var request = require('request');

var acctkVal = process.argv[2];
if (acctkVal == null) {
  console.log("No acctk found");
  exit(-1);
}

var baseUrl = "";
var sources = [
  "https://ciandt.smartcanvas.com/api/v1/collections/66110001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/v1/collections/81720001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/v1/collections/98030001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/v1/collections/63200001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/v1/collections/60410001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/v1/collections/69040001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/v1/collections/70990001/followers?timezoneOffset=180&offset=__offset__",
  "https://ciandt.smartcanvas.com/api/search/v1/cards/teams/4687659565842432/members?timezoneOffset=180&offset=__offset__",
];

var followers = [];

function getSourceFollowers(offset, source, callback) {

  var sourceUrl = source.replace("__offset__", offset);

  request.get({
      url: sourceUrl,
      headers: {'cookie': ('acctk='+acctkVal)},
      json:true
    }, function (error, response, body) {

      if (!error && response.statusCode == 200) {
        body.data.forEach(function(item) {followers.push(item.email)});
        console.log("got source " + sourceUrl + " ; count: " + body.meta.count + " pos " + body.meta.pos + " appended " + body.data.length + " offset: " + offset);
      };

      if (body.meta.pos < body.meta.count) {
          getSourceFollowers(offset+16, source, callback);
      } else {
          callback();
      }
    }
  );
}

console.log("Scraping followers");

let requests = sources.reduce((promiseChain, source) => {
    return promiseChain.then(() => new Promise((resolve) => {
      getSourceFollowers(0, source, resolve);
    }));
}, Promise.resolve());

requests.then(function() {
  console.log('Scraped ' + followers.length);

  var uniqueFollowers = [];
  followers.forEach(function(el) {
      if(uniqueFollowers.indexOf(el) === -1)
        uniqueFollowers.push(el);
  });

  console.log(uniqueFollowers.length);
  console.log("* " + uniqueFollowers.sort().join('\n* '));
});
