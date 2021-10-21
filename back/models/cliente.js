var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombre: String,
    dni: String,
    email: String,
    puntos: Number,
    createAtt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente', ClienteSchema);