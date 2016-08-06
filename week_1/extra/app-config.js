const express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('nunj', engines.nunjucks);
app.set('view engine', 'nunj');
app.set('views', __dirname + '/views');


app.use(express.static('stylesheets'));

module.exports = app;
