const {Schema, model } = require("mongoose");

const NegocioSchema = Schema({

    CLIENTE: {type: String, required: true},
    PRODUCTO: {type: String, required: true},
    IMPRESION:{
        MATERIAL:{type: String, required: true},
        TIPOIMPRESION:{type: String, required: true},
        CONTROL:{type: String, required: true},
    },
    CORTE: {type: Boolean, required: true},
    ENSOBRADO:{
        ENSOBRADO:{type: Boolean, required: true}, 
        METODO:{type: String, required: true},
        ENTRADA:{type: String, required: true},
        MATERIAL:{type: String, required: true},
        ENTREGA:{type: String, required: true},
        CONTROL:{type: String, required: true}
    },
    GUILLOTINADO:{type: Boolean, required: true},
    LAMINADO:{type: Boolean, required: true},
    ENCUADERNADO:{type: Boolean, required: true},
    TRILATERAL:{type: Boolean, required: true},
    PICKEO:{type: Boolean, required: true},
    DESPACHO:{type: Boolean, required: true}
});

module.exports=model("Negocio", NegocioSchema, "negocios");