var express = require('express')
var app = express();

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/api_endpoint', function(req, res) {
    var json_object = { name: "Node.JS Demo", location: "ACM Clubhouse" };
    res.send(json_object);
});

app.get('/user/:userID', function(req, res) {
	res.send("<h1>Hello, " + req.params.userID + "<\/h1>");
});

app.use('/static', express.static('static'));

app.listen(3000);
