const Cliente = require('../modelos/Cliente');
const {validarCliente} = require("../helpers/validar");
const fs = require("fs");
const path = require('path');

/* Listar todas los clientes de la base de datos */
const listarClientes = async (req, res) => {

    let consulta = await Cliente.find({}).sort({NOMBRE_CLIENTE: "desc"}).exec();

    if(!consulta) return res.status(400).json({status: false, mensaje:"Error al consultar BD"});

    return res.status(200).send(consulta);

    /*
    let consulta = Cliente.find({});

    
    if (req.params.cantidad) {
        consulta.limit(parseInt(req.params.cantidad));
    }


    consulta.sort({ NOMBRE_CLIENTE: "asc" })
        .then((listadoClientes) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                contador: listadoClientes.length,
                listadoClientes
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar los clientes"
            });
        })*/
}

/* Busca y devuelve el cliente recibiendo por body el id del cliente */
const obtenerCliente = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const consulta= await Cliente.findById(proyectoId).exec();

    if(!consulta) return res.status(400).json({status: false, mensaje:"Cliente no encontrado"});

    return res.status(200).send(consulta);
    /*
    let consulta = Cliente.findById(proyectoId)
        .then((Cliente) => {
            if (Cliente != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    Cliente
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    descripcion: "Id no encontrado en la Base de datos de clientes"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar el cliente"
            });
        })*/
}

/* Da de alta un cliente recibiendo los datos desde un form */
const altaCliente = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    //valido los datos
    try {
        validarCliente(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos"
        });
    }

    const isCliente= await  Cliente.findOne({ "NOMBRE_CLIENTE": elementos_recibidos.NOMBRE_CLIENTE }).exec();
        
    if(isCliente) return res.status(400).json({status: false, mensaje:"Cliente existente"});
    
    elementos_recibidos.IMAGEN = "default_cliente.png";
    
    //creo el objeto y le asigno los elementos recibidos
    const cliente = new Cliente(elementos_recibidos);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    const newCliente= await cliente.save();
    if(!newCliente) return res.status(400).json({status: false, mensaje:"Error al dar de alta el Cliente"});

    return res.status(200).send(newCliente);


    /*
    //creo el objeto y le asigno los elementos recibidos
    const cliente = new Cliente(elementos_recibidos);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    cliente.save().then((clienteGuardada) => {
        //Devolver resultado
        return res.status(200).json({
            status: "success",
            clienteGuardada
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "error",
            message: "Error al dar de alta el cliente"
        });
    })*/

}

/* Borrar un cliente recibiendo por body el id del cliente */
const borrarCliente = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const delCliente = await Cliente.findOneAndDelete({ _id: proyectoId }).exec();

    if(!delCliente) return res.status(400).json({status: false, mensaje:"Error al borrar el cliente"});

    return res.status(200).send(delCliente);

    /*
    let consulta = Cliente.findOneAndDelete({ _id: proyectoId })
        .then((Cliente) => {
            if (Cliente != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    Cliente
                });
            } else {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    descripcion: "Id no encontrado en la Base de datos de clientes"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar el cliente"
            });
        })*/
}

/* Actualizar un cliente recibiendo por body el id del cliente */
const editarCliente = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;
    proyectoId = elementos_recibidos.id;

    //valido los datos
    try {
        validarCliente(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos del cliente"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    var clienteUpdate = {

        NOMBRE_CLIENTE: { type: String, required: true },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        ESTADO: { type: String, required: false },
        IMAGEN: {type: String,  default: "default_cliente.png"}
    };

    //Asigno valores a objeto basado en el modelo (manual o automatico)
    clienteUpdate.NOMBRE_CLIENTE = elementos_recibidos.NOMBRE_CLIENTE;
    clienteUpdate.FECHA_CREACION = elementos_recibidos.FECHA_CREACION;
    clienteUpdate.HORA_CREACION = elementos_recibidos.HORA_CREACION;
    clienteUpdate.ESTADO = elementos_recibidos.ESTADO;
    clienteUpdate.IMAGEN = "default_cliente.png";


    const updateCliente=await Cliente.findOneAndUpdate({ _id: proyectoId }, clienteUpdate, { new: true }).exec();

    if(!updateCliente) return res.status(400).json({status: false, mensaje:"Error al actualizar el Cliente"});

    return res.status(200).send(updateCliente);
    
    /*
    //Guardar el cliente en base de datos
    Cliente.findOneAndUpdate({ _id: proyectoId }, clienteUpdate, { new: true })
        .then((clienteGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: clienteGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el cliente"
            });
        })*/
}

const subirImagenCliente = (req, res) => {

    //Configurar multer, esto se hace en rutas de subir imagen, se aplica el middleware

    //Recoger el archivo de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida - Falta file",
        });
    }

    //Nombre del archivo
    let nombre_archivo = req.file.originalname.replace(/ /g, "");

    //Extension del archivo
    let nombre_archivo_split = nombre_archivo.split("\.");
    let nombre_archivo_extension = nombre_archivo_split[nombre_archivo_split.length - 1];

    //Comprobar extension correcta
    if (nombre_archivo_extension != "png" && nombre_archivo_extension != "jpg" && nombre_archivo_extension != "jpeg" && nombre_archivo_extension != "gif" &&
        nombre_archivo_extension != "PNG" && nombre_archivo_extension != "JPG" && nombre_archivo_extension != "JPEG" && nombre_archivo_extension != "GIF") {
        //Borro el archivo y doy respuesta
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
        });
        return res.status(400).json({
            status: "error",
            mensaje: "Extension no permitida - Solo png, jpg, jpeg y gif",
            nombre: nombre_archivo,
            ext: nombre_archivo_extension
        });
    }

    //Si todo va bien, actualizar el colaborador
    //recogo los parametros a guardar
    proyectoId = req.body.id;

    //Guardar el colaborador en base de datos y Devuelvo respuesta
    Cliente.findOneAndUpdate({ _id: proyectoId }, { IMAGEN: nombre_archivo }, { new: true })
        .then((clienteGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: clienteGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el cliente"
            });
        })
}

const obtenerImagenCliente = (req, res) => {

    let file = req.body.imagen;
    let path_file = './imagenes/clientes/' + file;

    fs.stat(path_file, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).json({
                status: "error",
                message: "La imagen no existe"
            });
        }
    });
}
module.exports = {
    listarClientes,
    altaCliente,
    obtenerCliente,
    borrarCliente,
    editarCliente,
    subirImagenCliente,
    obtenerImagenCliente
}