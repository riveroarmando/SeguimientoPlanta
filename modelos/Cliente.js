const {Schema, model } = require("mongoose");

const ClienteSchema = Schema({

    NOMBRE_CLIENTE: {type: String, required: true},
    FECHA_CREACION: {type: String, required: true},
    HORA_CREACION: {type: String, required: true},
    ESTADO: {type: String, required: false},
    IMAGEN: {type: String,  default: "default_cliente.png"}

});

module.exports=model("Cliente", ClienteSchema, "clientes");