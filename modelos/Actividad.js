const {Schema, model } = require("mongoose");

const ActividadSchema = Schema({

    NOMBRE_ACTIVIDAD: {type: String, required: true},
    FECHA_CREACION: {type: String, required: true},
    HORA_CREACION: {type: String, required: true},
    ESTADO: {type: String, required: false},
    IMAGEN: {type: String,  default: "default_actividad.png"}

});

module.exports=model("Actividad", ActividadSchema, "actividades");