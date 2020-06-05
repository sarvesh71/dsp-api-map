

const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

//object files import
var adAccountUser = require('./fb_nodes/adAccountUser');

//controller files import
var root = require('./controllers/root_nodes');


const config = require('./config');

var app = express();
var router = express.Router();

// log if in dev mode
if (app.get('env') !== 'production') app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
router.route('/:rootid')
	.get(root.getData);



app.use('/', router);

// handle 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).send();
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;