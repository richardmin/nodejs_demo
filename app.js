var express = require('express');
var app = express();
var expressHbs = require('express3-handlebars');
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));

app.set('view engine', 'hbs');

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

app.get('/templates', function(req, res){
	res.render('index');
});

app.get('/simple', function(req, res){
  var data = {name: 'Gorilla'};
  res.render('simple', data);
});

app.use('/static', express.static('static'));

app.listen(3000);
