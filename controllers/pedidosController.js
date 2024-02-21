const Pedidos = require('../models/Pedidos');

//crear un pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();

        res.json({ mensaje: 'Se agrego un nuevo pedido' })
    } catch (error) {
        console.log(error)
        next()
    }
}

//mostrar todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {

        //realizamos la consulta a la base de datos y con .populate traemos el contenido de as relaciones
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedidos)

    } catch (error) {
        console.log(error)
        next()
    }
}

//muestra un pedido por su id
exports.mostrarPedido = async (req, res, next) => {

    const pedido = await Pedidos.findById(req. params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if(!pedido){
        res.json({ mensaje: "Ese pedido no existe!" })
        return next()
    }

    //MOSTRAR EL PEDIDO
    res.json(pedido);
}

exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id : req.params.idPedido }, req.body, {
            new: true 
        } )
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido)

    } catch (error) {
        console.log(error)
        next();
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try {
        
        await Pedidos.findOneAndDelete({ _id: req.params.idPedido })

        res.json({mensaje: 'El pedido se elimino!'})

    } catch (error) {
        console.log(error)
        next();
    }
}