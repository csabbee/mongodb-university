const MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    config = require('./config'),
    app = require('./app-config');

MongoClient.connect(config.URL, (err, db) => {
    assert.equal(null, err);
    console.log('Successfully connected to MongoDB');

    require('./routes')(app, db);

    const server = app.listen(config.PORT, () => {
        const port = server.address().port;
        console.log(`Express server is listening on port ${port}`);
    });
});
