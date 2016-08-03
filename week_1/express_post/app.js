const express = require('express'),
    app = express(),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    _ = require('lodash');

app.engine('nunj', consolidate.nunjucks);
app.set('view engine', 'nunj');
app.set('views', __dirname + '/views');
app.use(express.Router());

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);

    res.render('error-template', { error: err.message});
}

app.use(errorHandler);

app.get('/', bodyParser.urlencoded(), (req, res, next) => {
    res.render('fruit-picker', { fruits: ['apple', 'orange', 'banana', 'peach']});
});

app.post('/favorite_fruit', bodyParser.urlencoded(), (req, res, next) => {
    const favorite = req.body.fruit;
    if (_.isUndefined(favorite)) {
        next(Error('Please choose a fruit!'));
    } else {
        res.send(`Your favorite fruit is: ${favorite}`);
    }
});

app.listen(3000);
console.log('Express server is listening on port 3000');
