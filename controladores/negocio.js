const Negocio = require('../modelos/Negocio');
const {validarNegocio} = require("../helpers/validar");

/* Listar todas los negocios de la base de datos */
const listarNegocios = async (req, res) => {

    let consulta = await Negocio.find({}).sort({CLIENTE: "desc"}).exec();

    if(!consulta) return res.status(400).json({status: false, mensaje:"Error al consultar BD"});

    return res.status(200).send(consulta);

}

/* Busca y devuelve el cliente recibiendo por body el id del cliente */
const obtenerNegocio = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const consulta= await Negocio.findById(proyectoId).exec();

    if(!consulta) return res.status(400).json({status: false, mensaje:"Negocio no encontrado"});

    return res.status(200).send(consulta);
}

/* Da de alta un cliente recibiendo los datos desde un form */
const altaNegocio = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    //valido los datos
    try {
        validarNegocio(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos"
        });
    }

    //const isNegocio= await  Negocio.findOne({ "CLIENTE": elementos_recibidos.CLIENTE }).exec();
        
    //if(isNegocio) return res.status(400).json({status: false, mensaje:"Negocio existente"});
    
    //creo el objeto y le asigno los elementos recibidos
    const negocio = new Negocio(elementos_recibidos);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    const newNegocio= await negocio.save();
    if(!newNegocio) return res.status(400).json({status: false, mensaje:"Error al dar de alta el Negocio"});

    return res.status(200).send(newNegocio);

}

/* Borrar un cliente recibiendo por body el id del cliente */
const borrarNegocio = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const delNegocio = await Negocio.findOneAndDelete({ _id: proyectoId }).exec();

    if(!delNegocio) return res.status(400).json({status: false, mensaje:"Error al borrar el Negocio"});

    return res.status(200).send(delNegocio);

}

/* Actualizar un cliente recibiendo por body el id del cliente */
const editarNegocio = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;
    proyectoId = elementos_recibidos._id;

    //valido los datos
    try {
        validarNegocio(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos del negocio"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    var negocioUpdate = {

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
    };

    //Asigno valores a objeto basado en el modelo (manual o automatico)
    negocioUpdate.CLIENTE = elementos_recibidos.CLIENTE;
    negocioUpdate.PRODUCTO = elementos_recibidos.PRODUCTO;
    negocioUpdate.IMPRESION.MATERIAL = elementos_recibidos.IMPRESION.MATERIAL;
    negocioUpdate.IMPRESION.TIPOIMPRESION = elementos_recibidos.IMPRESION.TIPOIMPRESION;
    negocioUpdate.IMPRESION.CONTROL = elementos_recibidos.IMPRESION.CONTROL;
    negocioUpdate.CORTE= elementos_recibidos.CORTE;
    negocioUpdate.ENSOBRADO.ENSOBRADO= elementos_recibidos.ENSOBRADO.ENSOBRADO;
    negocioUpdate.ENSOBRADO.METODO= elementos_recibidos.ENSOBRADO.METODO;
    negocioUpdate.ENSOBRADO.ENTRADA= elementos_recibidos.ENSOBRADO.ENTRADA;
    negocioUpdate.ENSOBRADO.MATERIAL= elementos_recibidos.ENSOBRADO.MATERIAL;
    negocioUpdate.ENSOBRADO.ENTREGA= elementos_recibidos.ENSOBRADO.ENTREGA;
    negocioUpdate.ENSOBRADO.CONTROL= elementos_recibidos.ENSOBRADO.CONTROL;
    negocioUpdate.GUILLOTINADO= elementos_recibidos.GUILLOTINADO;
    negocioUpdate.LAMINADO= elementos_recibidos.LAMINADO;
    negocioUpdate.ENCUADERNADO= elementos_recibidos.ENCUADERNADO;
    negocioUpdate.TRILATERAL= elementos_recibidos.TRILATERAL;
    negocioUpdate.PICKEO= elementos_recibidos.PICKEO;
    negocioUpdate.DESPACHO= elementos_recibidos.DESPACHO;


    const updateNegocio=await Negocio.findOneAndUpdate({ _id: proyectoId }, negocioUpdate, { new: true }).exec();

    if(!updateNegocio) return res.status(400).json({status: false, mensaje:"Error al actualizar el Negocio"});

    return res.status(200).send(updateNegocio);
    
}

/* Listar todas los negocios que coincidan con el cliente y producto de la base de datos */
const listarNegociosFiltroClienteProducto = async (req, res) => {

    clienteFiltro = req.params.clienteFiltro;
    productoFiltro = req.params.productoFiltro;
    
    let consulta = await Negocio.find({ CLIENTE: clienteFiltro, PRODUCTO: productoFiltro}).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);


}

module.exports = {
    listarNegocios,
    altaNegocio,
    obtenerNegocio,
    borrarNegocio,
    editarNegocio,
    listarNegociosFiltroClienteProducto
}