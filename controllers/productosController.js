const Productos = require('../models/Productos')

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');


const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

//agrega nuevos produtos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {

        //se verifica si hay algun archivo
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }

        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto!' });

    } catch (error) {
        console.log(error)
        next()
    }
}

//mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({})
        res.json(productos)

    } catch (error) {
        console.log(error)
        next()
    }
}

//muestra un producto es espcfico por su id
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto)

        //validar si encontro el producto
        if (!producto) {
            res.json({ mensaje: 'El producto no existe!' })
            return next()
        }

        //mostrar producto
        res.json(producto)

    } catch (error) {
        console.log(error)
        next()
    }
}

// actualizar un producto
exports.actualizarProducto = async (req, res, next) => {
    try {

        //construir un nueo Producto
        let nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{

            let productoAnterior = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id : req.params.idProducto }, nuevoProducto,{
            new: true
        });

        res.json({ mensaje: 'Se ha actualizado la informacion del producto', producto })

    } catch (error) {
        console.log(error)
    }
}

exports.eliminarProducto = async (req, res, next) => {
    try {
        
        await Productos.findOneAndDelete({ _id : req.params.idProducto })

        res.json({ mensaje: 'El producto se ha eliminado' })
    } catch (error) {
        console.log(error)
    }
}

//busqueda de un producto en especifico
exports.buscarProducto = async (req, res, next) => {
    try {
         //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query,'i') })
        res.json(producto)
        
    } catch (error) {
        console.log(error)
    }
}

// Actualizar Producto y eliminar imagen anterior
//! se deben instalar las dependencas necesarias

// import path from 'path';
// import { fileURLToPath } from 'url'
// import { unlink } from 'fs'

// exports.actualizarProducto = async (req, res, next) => {
//     const nuevoProducto = req.body
//     try {
//         const productoAnterior = await Productos.findById(req.params.idProducto)
//         if (req.file) {
//             nuevoProducto.imagen = req.file.filename
//             const __dirname = path.dirname(fileURLToPath(import.meta.url))
//             const imagenAnteriorPath = path.join(__dirname, '..', `/uploads/${productoAnterior.imagen}`)
//             unlink(imagenAnteriorPath, (error) => {
//                 if (error) {
//                     return console.log(error)
//                 }
//             })
//         } else {
//             nuevoProducto.imagen = productoAnterior.imagen
//         }
//         const producto = await Productos.findByIdAndUpdate(req.params.idProducto, nuevoProducto, { new: true })
//         res.json({ mensaje: 'Se ha actualizado la informacion del producto', producto })
//     } catch (error) {
//         console.log(error)
//         next()
//     }
// }