const express = require('express'),
    app = express(),
    consolidate = require('consolidate');

app.engine('nunj', consolidate.nunjucks);
app.set('view engine', 'nunj');
app.set('views', __dirname + '/views');

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);

    res.render('error_template', { error: err});
}

app.use(errorHandler);

app.get('/:name', (req, res, next) => {
    const name = req.params.name;
    const getvar1 = req.query.getvar1;
    const getvar2 = req.query.getvar2;

    res.render('hello', {name: name, getvar1: getvar1, getvar2: getvar2});
});

app.listen(3000);
console.log('Express server is listening on port 3000');