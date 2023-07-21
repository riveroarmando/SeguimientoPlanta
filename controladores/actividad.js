const Actividad = require('../modelos/Actividad');
const {validarActividad} = require("../helpers/validar");
const fs = require("fs");
const path = require('path');

/* Listar todas las actividades de la base de datos */
const listarActividades = (req, res) => {

    let consulta = Actividad.find({});

    if (req.params.cantidad) {
        consulta.limit(parseInt(req.params.cantidad));
    }


    consulta.sort({ NOMBRE_ACTIVIDAD: "asc" })
        .then((listadoActividades) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                contador: listadoActividades.length,
                listadoActividades
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar las actividades"
            });
        })
}

/* Busca y devuelve la actividad recibiendo por body el id de la actividad */
const obtenerActividad = (req, res) => {

    proyectoId = req.body.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    let consulta = Actividad.findById(proyectoId)
        .then((Actividad) => {
            if (Actividad != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    Actividad
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    descripcion: "Id no encontrado en la Base de datos de actividades"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar la actividad"
            });
        })
}

/* Da de alta una actividad recibiendo los datos desde un form */
const altaActividad = (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    //valido los datos
    try {
        validarActividad(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    const actividad = new Actividad(elementos_recibidos);
    //console.log(actividad);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    actividad.save().then((actividadGuardada) => {
        //Devolver resultado
        return res.status(200).json({
            status: "success",
            actividadGuardada
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "error",
            message: "Error al dar de alta la actividad"
        });
    })

}

/* Borrar una actividad recibiendo por body el id de la actividad */
const borrarActividad = (req, res) => {

    proyectoId = req.body.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    let consulta = Actividad.findOneAndDelete({ _id: proyectoId })
        .then((Actividad) => {
            if (Actividad != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    Actividad
                });
            } else {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    descripcion: "Id no encontrado en la Base de datos de actividades"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar la actividad"
            });
        })
}

/* Actualizar una actividad recibiendo por body el id de la actividad */
const editarActividad = (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;
    proyectoId = elementos_recibidos.id;

    //valido los datos
    try {
        validarActividad(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos de actividad"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    var actividadUpdate = {

        NOMBRE_ACTIVIDAD: { type: String, required: true },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        ESTADO: { type: String, required: false },
        IMAGEN: {type: String,  default: "default_actividad.png"}
    };

    //Asigno valores a objeto basado en el modelo (manual o automatico)
    actividadUpdate.NOMBRE_ACTIVIDAD = elementos_recibidos.NOMBRE_ACTIVIDAD;
    actividadUpdate.FECHA_CREACION = elementos_recibidos.FECHA_CREACION;
    actividadUpdate.HORA_CREACION = elementos_recibidos.HORA_CREACION;
    actividadUpdate.ESTADO = elementos_recibidos.ESTADO;
    actividadUpdate.IMAGEN = "default_actividad.png";


    //Guardar la actividad en base de datos
    Actividad.findOneAndUpdate({ _id: proyectoId }, actividadUpdate, { new: true })
        .then((actividadGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: actividadGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar la actividad"
            });
        })
}

const subirImagenActividad = (req, res) => {

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

    //Guardar la actividad en base de datos y Devuelvo respuesta
    Actividad.findOneAndUpdate({ _id: proyectoId }, { IMAGEN: nombre_archivo }, { new: true })
        .then((actividadGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: actividadGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el actividad"
            });
        })
}

const obtenerImagenActividad = (req, res) => {

    let file = req.body.imagen;
    let path_file = './imagenes/actividades/' + file;

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
    listarActividades,
    altaActividad,
    obtenerActividad,
    borrarActividad,
    editarActividad,
    subirImagenActividad,
    obtenerImagenActividad
}