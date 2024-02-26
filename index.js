const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/restApi');


//crear el servidor
const app = express();

//habilitar el bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//habilitar cors
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

//rutas de la app
app.use('/', routes());

//carpeta publica
app.use(express.static('uploads'))


//puerto
app.listen(5000);