const express = require('express');
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productoController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')

module.exports = function() {
    /* CLIENTES */
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

    /* PRODUCTOS */ 
    // agregar productos 
    router.post('/productos',
    productoController.subirArchivo,
    productoController.nuevoProducto
    )

    //mostrar todos los productos
    router.get('/productos', productoController.mostrarProductos)

    //muestra un producto es espcfico por su id
    router.get('/productos/:idProducto', productoController.mostrarProducto)

    //actualzarProducto
    router.put('/productos/:idProducto',
    productoController.subirArchivo,
    productoController.actualizarProducto
    )

    //eliminar producto
    router.delete('/productos/:idProducto', productoController.eliminarProducto)
    
    /*PEDIDOS*/
    //agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    // mostrar todos los pedidos 
    router.get('/pedidos', pedidosController.mostrarPedidos)

    // mostrar pedido por su id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)

    // actualizar pedido 
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

    //eliminar pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)

    return router;
}