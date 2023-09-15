/*
import http = require('http');
var fs = require('fs');
var index = fs.readFileSync('HTMLPage1.html');
const port = process.env.port || 1337
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(index);
}).listen(port);
*/
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/HTMLPage1.html'));
});
app.listen(1337);
//# sourceMappingURL=server.js.map