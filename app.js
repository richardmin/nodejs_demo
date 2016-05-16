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


app.get('/datarender', function(req, res){
  var data = {
    name: 'Joe Bruin',
    address: {
      streetName: 'De Neve Drive',
      streetNumber: '330',
      floor: 7,
      addressType: {
        typeName: 'residential'
      }
    }
  };
  res.render('datarender', data);
});

app.get('/loop', function(req, res){
  var basketballPlayers = [
    {name: 'Lebron James', team: 'the Heat'},
    {name: 'Kevin Durant', team: 'the Thunder'},
    {name: 'Kobe Jordan',  team: 'the Lakers'}
  ];
  
  var days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  var data = {
    basketballPlayers: basketballPlayers,
    days: days
  };
  
  res.render('loop', data);
});

app.get('/logic', function(req, res){
  var data = {
    upIsUp: true,
    downIsUp: false,
    skyIsBlue: "yes"
  };
  
  res.render('logic', data);
});

app.use('/static', express.static('static'));

app.listen(3000);
