"use strict";
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {width: 1024, height: 768},
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
});
var request = require('request');

var acctkVal = null;
var strCookies = "";
for (var i in phantom.cookies) {
  strCookies += phantom.cookies[i].name + "=" + phantom.cookies[i].value + ";";
  if (phantom.cookies[i].name == "acctk") {
      acctkVal = phantom.cookies[i].value;
  }
}

if (acctkVal == null) {
  console.log("No auth cookie found");
  exit(0);
}

//var baseUrl = "https://ciandt.smartcanvas.com/api/v1/collections/__boardid__/followers?timezoneOffset=__offset__";
var baseUrl = "https://0ea41fcb.ngrok.io";
var boards = ["81720001", "66110001", "69040001", "60410001", "63200001", "70990001", "98030001" ];
var followers = [];

function getBoardFollowers(offset, boardId, callback) {

  var callback = {};
  var boardUrl = baseUrl.replace("__boardid__", boards[0]).replace("__offset__", offset);
  console.log("requesting: " + boardUrl + " cook: " + strCookies);

  request.get({
      url: boardUrl,
      json: true,
      cookie: strCookies
  }, function (error, response, body) {
    console.log(error);
    console.log(body);
    console.log("statuscode: " + response.statusCode);

    if (!error && response.statusCode == 200) {
      _.each(body.data, function (post) {
        followers.push(body.data);
      });

      if (body.data.length > 0) {
        getBoardFollowers(offset+180, boardId, callback);
      } else {
        callback();
      }
    } else {
      console.log("statuscode: " + response.statusCode);
      throw error;
    }
  });
};

console.log("Scraping followers");
getBoardFollowers(0, boards[0], function () {
    console.log('We are done');
    console.log(followers);
});
