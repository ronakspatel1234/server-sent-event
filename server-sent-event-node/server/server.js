var express = require('express');
var app = express();
var count = 0;

var route = express.Router();

var connections = [];
route.get('/data', function (req, res) {
  req.socket.setTimeout(50000000);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  })
  res.write('/n');
  connections.push(res)


  req.on("close", function () {
    var rem = 0;
    for (let i = 0; i < connections.length; i++) {
      if (connections[i] == res) {
        rem = i;
        break;
      }
    }
    connections.splice(rem, 1)
  });


})

setInterval(function () {
  count++;
  connections.forEach(function (res) {
    var d = new Date();
    res.write(`data: ${count}\n\n`);
  })
}, 500);
app.use('/api', route);
app.use('/api1', route);
app.listen(5000);