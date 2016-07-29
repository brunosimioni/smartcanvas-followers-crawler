"use strict";
var x = require("casper").selectXpath;
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {width: 1024, height: 768},
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
    }
});

casper.options.clientScripts.push("node_modules/babel-polyfill/dist/polyfill.js");


var boards = ["81720001", "66110001", "69040001", "60410001", "63200001", "70990001", "98030001" ];
var urlPrefix = "https://ciandt.smartcanvas.com/m/board-followers/";
var url = urlPrefix + boards[0];

var followers = [];


casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});
casper.on("resource.error", function(msg, trace) {
    this.echo("Resource Error: " + msg, "ERROR");
});
casper.on("casper.page.onResourceTimeout", function(msg, trace) {
    this.echo("onResourceTimeout: " + msg, "ERROR");
});


// Opens smartcanvas homepage
console.log("Opening Smartcanvas");
casper.start('https://ciandt.smartcanvas.com/c/foryou')
.thenOpen('https://ciandt.smartcanvas.com/c/foryou', function() {
  this.capture("step-parc1.png");
  this.wait(20000);
  this.capture("step-parc2.png");
  this.wait(20000);
  this.capture("step-parc3.png");
  /*
    casper.evaluate(function() {
      document.querySelectorAll("#cardsContainer > scanvas-grid-card[card-type='person']").forEach(function(obj) {
        followers.push(obj.getAttribute("card-id"));
      });
      console.log(followers);
    });
  });
  */
});
casper.run(function () {
    this.capture("step-final.png");
    casper.done();
});
