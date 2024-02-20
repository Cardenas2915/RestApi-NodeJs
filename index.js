const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/restApi');


//crear el servidor
const app = express();

//habilitar el bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas de la app
app.use('/', routes());


//puerto
app.listen(3000);