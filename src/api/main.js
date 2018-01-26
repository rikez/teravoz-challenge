

const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require('body-parser');
const env = require('../config/env');
const ejs = require('ejs');

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('baseRoute', '/v1/api');

const routes = require('./routes')(app, io);
const port = env.PORT || 8082;


server.listen(port);

server.on('listening', (data) => console.log(`Server is ready to go at port ${port}`));
