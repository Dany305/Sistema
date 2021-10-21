var Cliente = require('../models/cliente');

function registrar(req, res){
    let data = req.body;
    var cliente = new Cliente();
    cliente.nombre = data.nombre;
    cliente.email = data.email;
    cliente.puntos = 10;

    cliente.save((err, cliente_save) =>{
        if(cliente_save){
            res.status(200).send({cliente: cliente_save});
        }else{
            res.status(500).send(err);
        }
    });
}

function editar(req, res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findByIdAndUpdate(id, { nombre: data.nombre, email: data.email,}, (err, cliente_edit) =>{
        if(cliente_edit){
            res.status(200).send({cliente: cliente_edit});
        }else{
            res.status(500).send({err});
        }
    });
}

function eliminar(req, res){
    let id = req.params['id'];

    Cliente.findByIdAndRemove(id, (err, cliente_delate) =>{
        if(cliente_delate){
            res.status(200).send({cliente: cliente_delate});
        }else{
            res.status(500).send({err});
        }
    });
}

module.exports = {
    registrar,
    editar,
    eliminar
}