const Equipamiento = require('../modelos/Equipamiento');
const { validarEquipamiento } = require("../helpers/validar");
const fs = require("fs");
const path = require('path');

/* Listar todas los equipos de la base de datos */
const listarEquipamientos = async (req, res) => {

    let consulta = await Equipamiento.find({}).sort({NOMBRE_EQUIPAMIENTO: "desc"}).exec();

    if(!consulta) return res.status(400).json({status: false, mensaje:"Error al consultar BD"});

    return res.status(200).send(consulta);

}

/* Busca y devuelve el equipamiento recibiendo por body el id del equipamiento */
const obtenerEquipamiento = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    let equipo = await Equipamiento.findById(proyectoId).exec();
        
    if(!equipo) return res.status(400).json({status: false, mensaje:"Equipo no encontrado"});

    return res.status(200).send(equipo);

}

/* Da de alta un equipamiento recibiendo los datos desde un form */
const altaEquipamiento = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    //valido los datos
    try {
        validarEquipamiento(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos"
        });
    }

    const isEquipamiento= await  Equipamiento.findOne({ "NOMBRE_EQUIPAMIENTO": elementos_recibidos.NOMBRE_EQUIPAMIENTO }).exec();
        
    if(isEquipamiento) return res.status(400).json({status: false, mensaje:"Equipamiento existente"});
    
    elementos_recibidos.IMAGEN = "default_equipamiento.png";
    
    //creo el objeto y le asigno los elementos recibidos
    const equipamiento = new Equipamiento(elementos_recibidos);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    const newEquipamiento= await equipamiento.save();
    if(!newEquipamiento) return res.status(400).json({status: false, mensaje:"Error al dar de alta el equipo"});

    return res.status(200).send(newEquipamiento);
    
}

/* Borrar un equipamiento recibiendo por body el id del equipamiento */
const borrarEquipamiento = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const delEquipamiento = await Equipamiento.findOneAndDelete({ _id: proyectoId }).exec();
    
    if(!delEquipamiento) return res.status(400).json({status: false, mensaje:"Error al borrar el equipo"});

    return res.status(200).send(delEquipamiento);

}

/* Actualizar un equipamiento recibiendo por body el id del equipamiento */
const editarEquipamiento = (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;
    proyectoId = elementos_recibidos.id;

    //valido los datos
    try {
        validarEquipamiento(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos del equipamiento"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    var equipamientoUpdate = {

        NOMBRE_EQUIPAMIENTO: { type: String, required: true },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        ESTADO: { type: String, required: false },
        CAPACIDAD: { type: String, required: true },
        NOMBRE_ACTIVIDAD: {type: String, required: true},
        IMAGEN: { type: String, default: "default_equipamiento.png" }
    };

    //Asigno valores a objeto basado en el modelo (manual o automatico)
    equipamientoUpdate.NOMBRE_EQUIPAMIENTO = elementos_recibidos.NOMBRE_EQUIPAMIENTO;
    equipamientoUpdate.FECHA_CREACION = elementos_recibidos.FECHA_CREACION;
    equipamientoUpdate.HORA_CREACION = elementos_recibidos.HORA_CREACION;
    equipamientoUpdate.ESTADO = elementos_recibidos.ESTADO;
    equipamientoUpdate.CAPACIDAD = elementos_recibidos.CAPACIDAD;
    equipamientoUpdate.NOMBRE_ACTIVIDAD = elementos_recibidos.NOMBRE_ACTIVIDAD;
    equipamientoUpdate.IMAGEN = "default_equipamiento.png";


    //Guardar el equipamiento en base de datos
    Equipamiento.findOneAndUpdate({ _id: proyectoId }, equipamientoUpdate, { new: true })
        .then((equipamientoGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: equipamientoGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el equipamiento"
            });
        })
}

const subirImagenEquipamiento = (req, res) => {

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
    Equipamiento.findOneAndUpdate({ _id: proyectoId }, { IMAGEN: nombre_archivo }, { new: true })
        .then((equipamientoGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: equipamientoGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el equipamiento"
            });
        })
}

const obtenerImagenEquipamiento = (req, res) => {

    let file = req.body.imagen;
    let path_file = './imagenes/equipamientos/' + file;

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
    listarEquipamientos,
    altaEquipamiento,
    obtenerEquipamiento,
    borrarEquipamiento,
    editarEquipamiento,
    subirImagenEquipamiento,
    obtenerImagenEquipamiento
}