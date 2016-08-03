var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, handleConnect);

function handleConnect(err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to server");

    // Find some documents in our collection
    db.collection('movies').find({}).toArray(handleQuery.bind(null, db));

    // Declare success
    console.log("Called find()");
}

function handleQuery(db, err, docs) {
    // Print the documents returned
    docs.forEach(function(doc) {
        console.log(doc.title);
    });

    // Close the DB
    db.close();
}