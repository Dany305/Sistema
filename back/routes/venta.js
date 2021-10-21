var express = require('express');
var ventaControllor = require('../controllers/VentaController');

var api = express.Router();

api.post('/venta/registar', ventaControllor.registar);
api.get('/venta/datos/:id', ventaControllor.datos_venta);

module.exports = api;