var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');

//Database setup
var mongojs = require('mongojs');
var uri = "mongodb://nodejsdemo:acmdemo@ds025772.mlab.com:25772/nodejsdemo",
    db = mongojs(uri, ["Quotes"]);




app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));

app.set('view engine', 'hbs');

//STATIC PAGE ENDPOINTS
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


//DATABASE EXAMPLES

app.get('/addPerson/:userName/:quote', function(req, res) {
  db.Quotes.insert({"name": req.params.userName, "quote": req.params.quote}, function(err, val) {
    if(err) 
      {
        console.log(err);
        res.send("Insert failed.");
        return;
      }
      res.send("Insert successful!");
  });
});

app.get('/viewPeople/', function(req, res) {

  db.Quotes.find(function(err, records) {
    if(err)
    {
      console.log("database error");
      return;
    }
    var html = '<h2>Search Results</h2>',
    i = records.length;

    while(i--) {
        html += '<p><b>Name:</b> ' 
             + records[i].name 
             + ' <br /><b>Quote:</b> ' 
             + records[i].quote;
    }
    res.send(html);

  });
});


//TEMPLATE EXAMPLES
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


//SETS UP STATIC SERVER
app.use('/static', express.static('static'));

app.listen(3000);
