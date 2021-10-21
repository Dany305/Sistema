var express = require('express');
var productoController = require('../controllers/ProductoController');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

api.post('/producto/registrar', path, productoController.registar);
api.get('/productos/:titulo?',productoController.listar);
api.put('/producto/editar/:id/:img',path, productoController.editar);
api.get('/producto/resgistro/:id', productoController.obtener_producto);
api.delete('/produto/eliminar/:id', productoController.eliminar);
api.put('/producto/stock/:id', productoController.update_stock);
api.get('/prodcuto/img/:img', productoController.get_img);

module.exports = api;