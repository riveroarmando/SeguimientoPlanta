const {Schema, model } = require("mongoose");

const ColaboradorSchema = Schema({

    NOMBRE_COLABORADOR: {type: String, required: true},
    NOMBRE_USUARIO: {type: String, required: true},
    FECHA_CREACION: {type: String, required: true},
    HORA_CREACION: {type: String, required: true},
    ESTADO: {type: String, required: false},
    TURNO: {type: String, required: true},
    PERFIL: {type: String, required: true},
    PASSWORD: {type: String, required: true},
    IMAGEN: {type: String,  default: "default_colaborador.png"},
    EMAIL: {type: String, required: false}

});

module.exports=model("Colaborador", ColaboradorSchema, "colaboradores");