var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../helpers/jwt");

function registrar(req, res){
    var params = req.body;
    var user = new User();

    if(params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
            if(hash){
                user.nombre = params.nombre;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.password = hash;
                user.role = params.role;

                user.save((err, user_save)=>{
                    if(err){
                        res.status(500).send({error: 'no se ingreso el usuario'});
                    }else{
                        res.status(200).send({user: user_save});
                    }
                });
            }
        });
    }else{
        res.status(403).send({error: 'No ingreso contraseña'});
    }
}

function login(req, res){
    var data = req.body;

    User.findOne({email: data.email},(err,user_data)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(user_data){
                bcrypt.compare(data.password, user_data.password, function(err, check){
                    if(check){
                        if(data.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            });
                        }else{
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data)
                            });
                        }
                    }else{
                        res.status(403).send({message: 'El corro o la contraseña es incorrecto'});
                    }
                });
            }else{
                res.status(403).send({message: 'El correo electrónico no existe'});
            }
        }
    });
}

module.exports= {
    registrar,
    login
}