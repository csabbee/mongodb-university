'use strict';

module.exports = function(app, db) {
    app.get('/', (err, res) => {
        res.render('main');
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });
};
