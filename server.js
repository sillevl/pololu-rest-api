var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// for development and testing (fake pololu server)
console.log("Creating fake pololu server for node-pololu. NOTE: development only !")
var server = require('net').createServer().listen(22446);

var pololu = require('node-pololu').create("fixed-id", 22446, '127.0.0.1');



app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/drive', function (req, res) {
  if(req.body.speed != undefined){
    var speed = req.body.speed;
    pololu.drive(speed);
    console.log("speed " + speed);
    res.send('{"status": "ok"}');
  } else {
    res.sendStatus(400);
  }

});

app.post('/api/turn', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/stop', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/calibrate', function (req, res) {
  res.send('Hello World!');
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
