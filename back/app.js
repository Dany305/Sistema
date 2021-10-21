const express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

//Routes
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_router = require('./routes/producto');
var cliente_router = require('./routes/cliente');
var venta_router = require('./routes/venta');

const app = express();

mongoose.connect('mongodb://localhost:27017/Sistema',(err,res)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Coriendo servidor");
        app.listen(port, function(){
            console.log("Servidor conectado en " + port);
        });
    }
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_router);
app.use('/api', cliente_router);
app.use('/api', venta_router);

module.exports = app;