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

var LOGIN_USERNAME = casper.cli.get('username');
var LOGIN_PASSWORD = casper.cli.get('password');

// Opens smartcanvas homepage
console.log("Opening Smartcanvas");
casper.start('http://www.smartcanvas.com')
.then(function() {
  casper.waitForSelector(".sign-up",function() {
      this.click(".sign-up");
  });
}).then(function () {
  casper.waitForSelector("#signInWithGoogleButton", function() {
    this.click("#signInWithGoogleButton");
  });
}).then(function () {
  casper.waitForSelector("form#gaia_loginform",function() {
    casper.sendKeys('#Email', LOGIN_USERNAME);
    this.click("#next");
    this.wait(10000);
    casper.waitForSelector("#Passwd",function() {
      casper.sendKeys('#Passwd', LOGIN_PASSWORD);
      this.click("#signIn");
    });
  });
}).then(function() {
  this.capture("step-parc1.png");
  this.wait(20000);
  this.capture("step-parc2.png");
});

casper.run(function () {
    this.capture("step-final.png");
    casper.done();
});
