const express = require('express');
const router = express.Router()
const clienteController = require('../controllers/clienteController')

module.exports = function() {

    //agregar nuevos clientes via post
    router.post('/clientes', clienteController.nuevoCliente);

    //obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    //mustra un cliente es especifico por medio de id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    //actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)

    //eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)
    
    return router;
}