var express = require('express'),
 util = require("util");

var app = express();

app.set('view engine', 'jade');

app.get('/', function(req,res){
 res.render('index');
});

app.use(express.static('js'));
app.use(express.static('css'));

var port = (process.env.PORT || 3000);
app.listen(port,null);
