const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const PORT = 3000;

app.engine('nunj', engines.nunjucks);
app.set('view engine', 'nunj');
app.set('views', __dirname + '/views');

const url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('Successfully connected to MongoDB');

    app.get('/', (err, res) => {
        res.render('main');
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });

    const server = app.listen(PORT, () => {
        const port = server.address().port;
        console.log(`Express server is listening on port ${port}`);
    });
});
