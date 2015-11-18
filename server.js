var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// for development and testing (fake pololu server)
console.log("Creating fake pololu server for node-pololu. NOTE: development only !")
var server = require('net').createServer().listen(22446);

var pololu = require('node-pololu').create("fixed-id", 22446, '127.0.0.1');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(bodyParser.json())
app.use(allowCrossDomain);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/drive', function (req, res) {
  if(req.body.speed != undefined && req.body.id != undefined){
    pololu.drive(req.body.speed);
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.post('/api/turn', function (req, res) {
  if(req.body.turnspeed != undefined && req.body.id != undefined){
    pololu.turn(req.body.turnspeed);
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.post('/api/stop', function (req, res) {
  if(req.body.stop === true && req.body.id != undefined){
    pololu.stop()
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.post('/api/calibrate', function (req, res) {
  if(req.body.calibrate === true && req.body.id != undefined){
    pololu.calibrate()
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.post('/api/leds/*', function (req, res) {
  var index = req.params[0];
  res.send('setting led: ' + index);
});

app.get('/api/line-sensor', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = server;
