const {Schema, model } = require("mongoose");

const EquipamientoSchema = Schema({

    NOMBRE_EQUIPAMIENTO: {type: String, required: true},
    FECHA_CREACION: {type: String, required: true},
    HORA_CREACION: {type: String, required: true},
    ESTADO: {type: String, required: false},
    CAPACIDAD: {type: String, required: true},
    NOMBRE_ACTIVIDAD: {type: String, required: true},
    IMAGEN: {type: String,  default: "default_equipamiento.png"}

});

module.exports=model("Equipamiento", EquipamientoSchema, "equipamientos");