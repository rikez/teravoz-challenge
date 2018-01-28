require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {'pingInterval': 5000, 'pingTimeout': 10000});
const bodyParser = require('body-parser');
const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];
const ejs = require('ejs');




app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('baseRoute', '/v1/api');

require('./routes')(app, io);

const port = env.PORT || 8082;


server.listen(port);

server.on('listening', (data) => console.log(`Server is ready to go at port ${port}`));
