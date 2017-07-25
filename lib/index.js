'use strict';

var express = require('express')
var app = express();
var path = require('path');

app.listen(8000, function() {
  console.log("Server listening on port 8000!")
});

app.use('/static', express.static('app'));
app.use('/static', express.static('data'));

app.get('/', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../views/index.html'));
});
app.get('/exp2', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../views/exp2.html'));
});
app.get('/exp3', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../views/exp3.html'));
});
