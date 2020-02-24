const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./lib/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//var distDir = __dirname + "/dist/";
//app.use(express.static(distDir));

var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);

});