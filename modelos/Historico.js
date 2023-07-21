const {Schema, model } = require("mongoose");

const HistoricoSchema = Schema({

    NOMBRE_TAREA: {type: String, required: true},
    CLIENTE: {type: String, required: true},
    PRODUCTO_CLIENTE:{type: String, required: true},
    ACTIVIDAD: {type: String, required: true},
    FECHA_CREACION: {type: String, required: true},
    HORA_CREACION: {type: String, required: true},
    CANTIDAD: {type: Number, required: true},
    UNIDAD: {type: String, required: true},
    FECHA_ASIGNACION: {type: String, required: false},
    HORA_ASIGNACION: {type: String, required: false},
    TURNO: {type: String, required: false},
    EQUIPAMIENTO: {type: String, required: false},
    OPERADOR: {type: String, required: false},
    NOMBRE_ASIGNADOR: {type: String, required: false},
    FECHA_INICIO_EJECUCION: {type: String, required: false},
    HORA_INICIO_EJECUCION: {type: String, required: false},
    OPERADOR_ASISTENTE: {type: String, required: false},
    COMPLEJIDAD: {type: String, required: false},
    FECHA_FIN_EJECUCION: {type: String, required: false},
    HORA_FIN_EJECUCION: {type: String, required: false},
    ESTADO: {type: String, required: false}

});

module.exports=model("Historico", HistoricoSchema, "historicos");