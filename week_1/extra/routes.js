'use strict';

const _ = require('lodash'),
    mongodb = require('mongodb'),
    urlEncodedParser = require('body-parser').urlencoded({ extended: false }),
    assert = require('assert');

module.exports = function(app, db) {
    app.get('/', (err, res) => {
        db.collection('movies').find({}).toArray((err, docs) => {
            res.render('main', { movies: docs });
        });
    });

    app.post('/movie', urlEncodedParser, (req, res) => {
        if (_.isEmpty(req.body.title) || _.isEmpty(req.body.year) || _.isEmpty(req.body.imdb)) {
            return res.sendStatus(400);
        }

        const movie = {
            title: req.body.title,
            year: req.body.year,
            imdb: req.body.imdb
        };

        db.collection('movies').insertOne(movie, (err, result) => {
            assert.equal(err, null);
            console.log('Inserted movie into collection');
            db.close();
            res.render('success', { movie: movie });
        });
    });

    app.post('/movie/:id', (req, res) => {
        db.collection('movies').deleteOne({ _id: new mongodb.ObjectID(req.params.id) }, () => {
            res.redirect('/');
        });
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });
};
