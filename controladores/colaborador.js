const Colaborador = require('../modelos/Colaborador');
const { validarColaborador } = require("../helpers/validar");
const { validarLoginColaborador } = require("../helpers/validar");
const fs = require("fs");
const path = require('path');
/*Para encriptar password */
var key = '123456789trytrytry';
var encryptor = require('simple-encryptor')(key);
/*Para autenticar por sesion */
const nanoid = require("nanoid");
const sesiones = [];

/*Para autinticar por token */
const jose = require("jose");


/* Listar todas los colaboradores de la base de datos */
const listarColaboradores = async (req, res) => {

    let consulta = await Colaborador.find({}).sort({ NOMBRE_COLABORADOR: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });

    return res.status(200).send(consulta);
    /*consulta.sort({ NOMBRE_COLABORADOR: "asc" })
        .then((listadoColaboradores) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                contador: listadoColaboradores.length,
                listadoColaboradores
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar los colaboradores"
            });
        })*/

}

/* Busca y devuelve el colaborador recibiendo por body el id del colaborador */
const obtenerColaborador = async (req, res) => {

    var proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    let usuario = await Colaborador.findById(proyectoId).exec();

    if (!usuario) return res.status(400).json({ status: false, mensaje: "Usuario no encontrado" });

    return res.status(200).send(usuario);
    /*.then((Colaborador) => {
            if (Colaborador != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    Colaborador
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    descripcion: "Id no encontrado en la Base de datos de colaboradores"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar el colaborador"
            });
        })*/
}

/* Da de alta un colaborador recibiendo los datos desde un form */
const altaColaborador = async (req, res) => {

    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    //valido los datos
    try {
        validarColaborador(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos"
        });
    }

    const isUser = await Colaborador.findOne({ "NOMBRE_USUARIO": elementos_recibidos.NOMBRE_USUARIO }).exec();

    if (isUser) return res.status(400).json({ status: false, mensaje: "Usuario existente" });

    const isUserID = await Colaborador.findOne({ "_id": elementos_recibidos._id }).exec();

    if (isUserID) return res.status(400).json({ status: false, mensaje: "Usuario existente" });

    elementos_recibidos.IMAGEN = "default_colaborador.png";
    var encrypted = encryptor.encrypt(elementos_recibidos.PASSWORD);
    elementos_recibidos.PASSWORD = encrypted;

    //creo el objeto y le asigno los elementos recibidos
    const colaborador = new Colaborador(elementos_recibidos);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    const newUser = await colaborador.save();
    if (!newUser) return res.status(400).json({ status: false, mensaje: "Error al dar de alta Usuario" });

    return res.status(200).send(newUser);
    /*
    const newUser= await colaborador.save().then((colaboradorGuardada) => {
        //Devolver resultado
        return res.status(200).json({
            status: "success",
            colaboradorGuardada
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "error",
            message: "Error al dar de alta el colaborador"
        });
    })*/

}

/* Borrar un colaborador recibiendo por body el id del colaborador */
const borrarColaborador = async (req, res) => {

    var proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const delUser = await Colaborador.findOneAndDelete({ _id: proyectoId }).exec();

    if (!delUser) return res.status(400).json({ status: false, mensaje: "Error al borrar el Usuario" });

    return res.status(200).send(delUser);
    /*let consulta = Colaborador.findOneAndDelete({ _id: proyectoId })
        .then((Colaborador) => {
            if (Colaborador != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    Colaborador
                });
            } else {
                //Devolver resultado
                return res.status(200).json({
                    status: "success",
                    descripcion: "Id no encontrado en la Base de datos de colaboradores"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar el colaborador"
            });
        })*/
}

/* Actualizar un colaborador recibiendo por body el id del colaborador */
const editarColaborador = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;
    let proyectoId = elementos_recibidos._id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    //valido los datos
    try {
        validarColaborador(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos del colaborador"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    var colaboradorUpdate = {

        NOMBRE_COLABORADOR: { type: String, required: true },
        NOMBRE_USUARIO: { type: String, required: true },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        ESTADO: { type: String, required: false },
        TURNO: { type: String, required: true },
        PERFIL: { type: String, required: true },
        PASSWORD: { type: String, required: true },
        IMAGEN: { type: String, default: "default_colaborador.png" },
        EMAIL: { type: String, required: false }
    };

    //Asigno valores a objeto basado en el modelo (manual o automatico)
    colaboradorUpdate.NOMBRE_COLABORADOR = elementos_recibidos.NOMBRE_COLABORADOR;
    colaboradorUpdate.NOMBRE_USUARIO = elementos_recibidos.NOMBRE_USUARIO;
    colaboradorUpdate.FECHA_CREACION = elementos_recibidos.FECHA_CREACION;
    colaboradorUpdate.HORA_CREACION = elementos_recibidos.HORA_CREACION;
    colaboradorUpdate.ESTADO = elementos_recibidos.ESTADO;
    colaboradorUpdate.TURNO = elementos_recibidos.TURNO;
    colaboradorUpdate.PERFIL = elementos_recibidos.PERFIL;
    colaboradorUpdate.PASSWORD = elementos_recibidos.PASSWORD;
    colaboradorUpdate.IMAGEN = elementos_recibidos.IMAGEN;
    colaboradorUpdate.EMAIL = elementos_recibidos.EMAIL;


    const updateUser = await Colaborador.findOneAndUpdate({ _id: proyectoId }, colaboradorUpdate, { new: true }).exec();

    if (!updateUser) return res.status(400).json({ status: false, mensaje: "Error al actualizar el Usuario" });

    return res.status(200).send(updateUser);

    /*
    //Guardar el colaborador en base de datos
    Colaborador.findOneAndUpdate({ _id: proyectoId }, colaboradorUpdate, { new: true })
        .then((colaboradorGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                colaboradorGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el colaborador"
            });
        })*/
}

const subirImagenColaborador = (req, res) => {

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
    var proyectoId = req.params.id;

    //Guardar el colaborador en base de datos y Devuelvo respuesta
    Colaborador.findOneAndUpdate({ _id: proyectoId }, { IMAGEN: nombre_archivo }, { new: true })
        .then((colaboradorGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                colaboradorGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar el colaborador"
            });
        })
}

const obtenerImagenColaborador = (req, res) => {

    let file = req.params.IMAGEN;
    let path_file = './imagenes/colaboradores/' + file;

    fs.stat(path_file, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).json({
                status: "error",
                message: "La imagen no existe",
                error,
                existe,
                path_file
            });
        }
    });
}

const loginColaboradorSesion = (req, res) => {


    //recogo los parametros a guardar
    var elementos_recibidos = req.body;

    //valido los datos
    try {
        validarLoginColaborador(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos del colaborador"
        });
    }

    //Busco el colaborador en base de datos y Devuelvo respuesta
    var resultado = Colaborador.findOne({ "NOMBRE_USUARIO": elementos_recibidos.NOMBRE_USUARIO }).exec();
    resultado.then(function (doc) {

        if (doc != undefined && doc != null) {
            var decrypted = encryptor.decrypt(doc.PASSWORD);
            if (decrypted == elementos_recibidos.PASSWORD) {
                const sesionID = nanoid.nanoid();
                const ID = doc._id;

                /*Ver si la siguiente linea se reemplaza por consulta a BD */
                sesiones.push({ sesionID, ID });

                res.cookie('sesionID', sesionID, {
                    httpOnly: true
                });
                return res.status(200).json({
                    status: true,
                    usuario: doc,
                    mensaje: "Login realizado"
                });
            } else {
                //Devolver resultado
                return res.status(403).json({
                    status: false,
                    mensaje: "Password incorrecta"
                });
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "Usuario no encontrado"
            });
        }
    });
}

const obtenerPerfilColaboradorSesion = (req, res) => {
    const { cookies } = req;
    if (!cookies.sesionID) return res.status(401).json({
        status: false,
        mensaje: "Usuario no autentificado"
    });

    /*Ver si la siguiente linea se reemplaza por consulta a BD */
    const sesionUsuario = sesiones.find((sesion) => sesion.sesionID === cookies.sesionID);

    if (!sesionUsuario) return res.status(401).json({
        status: false,
        mensaje: "Sesion expirada"
    });

    var proyectoId = sesionUsuario.ID;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido",
            cookies
        });
    }

    let consulta = Colaborador.findById(proyectoId)
        .then((Colaborador) => {
            if (Colaborador != null) {
                //Devolver resultado
                return res.status(200).json({
                    status: true,
                    Colaborador
                });
            } else {
                return res.status(200).json({
                    status: true,
                    descripcion: "Id no encontrado en la Base de datos de colaboradores"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al consultar el colaborador"
            });
        })

}

const loginColaboradorToken = (req, res) => {


    //recogo los parametros a guardar
    var elementos_recibidos = req.body;

    //valido los datos
    try {
        validarLoginColaborador(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos del colaborador"
        });
    }

    //Busco el colaborador en base de datos y Devuelvo respuesta
    var resultado = Colaborador.findOne({ "NOMBRE_USUARIO": elementos_recibidos.NOMBRE_USUARIO }).exec();
    resultado.then(async function (doc) {

        if (doc != undefined && doc != null) {
            var decrypted = encryptor.decrypt(doc.PASSWORD);
            if (decrypted == elementos_recibidos.PASSWORD) {

                const ID = doc._id;
                const NOMBRE_COLABORADOR = doc.NOMBRE_COLABORADOR;
                const NOMBRE_USUARIO = doc.NOMBRE_USUARIO;
                const ESTADO = doc.ESTADO;
                const PERFIL = doc.PERFIL;
                const IMAGEN = doc.IMAGEN;
                const jwtConstructor = new jose.SignJWT({ ID, NOMBRE_COLABORADOR, NOMBRE_USUARIO, ESTADO, PERFIL, IMAGEN });

                const encoder = new TextEncoder();


                const jwt = await jwtConstructor.setProtectedHeader({ "alg": "HS256", "typ": "JWT" })
                    .setIssuedAt()
                    .setExpirationTime("2h")
                    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));


                /*const alg = 'HS256'
                      
                const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
                        .setProtectedHeader({ alg })
                        .setIssuedAt()
                        .setIssuer('urn:example:issuer')
                        .setAudience('urn:example:audience')
                        .setExpirationTime('2h')
                        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
                      
                      console.log(jwt);*/
                return res.status(200).json({
                    status: true,
                    jwt
                });
            } else {
                //Devolver resultado
                return res.status(403).json({
                    status: false,
                    mensaje: "Password incorrecta"
                });
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "Usuario no encontrado"
            });
        }
    });
}

const obtenerPerfilColaboradorToken = async (req, res) => {

    const proyectoId = req.ID;
    //creo el objeto y le asigno los elementos recibidos
    var datosColaborador = {

        NOMBRE_COLABORADOR: { type: String, required: true },
        NOMBRE_USUARIO: { type: String, required: true },
        PERFIL: { type: String, required: true },
        IMAGEN: { type: String, required: true },
    };

    try {

        if (proyectoId == null) {
            return res.status(500).json({
                status: "error",
                message: "id no recibido",
                cookies
            });
        }

        let consulta = Colaborador.findById(proyectoId)
            .then((Colaborador) => {
                if (Colaborador != null) {
                    //Devolver resultado
                    //Asigno valores a objeto
                    datosColaborador.NOMBRE_COLABORADOR = Colaborador.NOMBRE_COLABORADOR;
                    datosColaborador.NOMBRE_USUARIO = Colaborador.NOMBRE_USUARIO;
                    datosColaborador.PERFIL = Colaborador.PERFIL;
                    datosColaborador.IMAGEN = Colaborador.IMAGEN;
                    return res.status(200).send(datosColaborador);
                } else {
                    return res.status(401).json({
                        status: false,
                        descripcion: "Id no encontrado en la Base de datos de colaboradores"
                    });
                }

            })
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Usuario no autenticado"
        });
    }


}

module.exports = {
    listarColaboradores,
    altaColaborador,
    obtenerColaborador,
    borrarColaborador,
    editarColaborador,
    subirImagenColaborador,
    obtenerImagenColaborador,
    loginColaboradorSesion,
    loginColaboradorToken,
    obtenerPerfilColaboradorSesion,
    obtenerPerfilColaboradorToken
}