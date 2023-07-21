const Tarea = require('../modelos/Tarea');
const { validarTarea } = require("../helpers/validar");


/* Listar todas las tareas de la base de datos */
const listarTareas = async (req, res) => {

    let consulta = await Tarea.find({}).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });

    return res.status(200).send(consulta);

}

/* Listar todas las tareas de la base de datos por colaborador*/
const listarTareasFiltroColaborador = async (req, res) => {

    colaboradorFiltro = req.params.colaboradorFiltro;

    let consulta = await Tarea.find({ OPERADOR: colaboradorFiltro }).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);

}

/* Listar todas las tareas de la base de datos por colaborador y cliente*/
const listarTareasFiltroColaboradorCliente = async (req, res) => {

    colaboradorFiltro = req.params.colaboradorFiltro;
    clienteFiltro = req.params.clienteFiltro;

    let consulta = await Tarea.find({ CLIENTE: clienteFiltro, OPERADOR: colaboradorFiltro }).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);

}

/* Listar todas las tareas de la base de datos por colaborador y cliente*/
const listarTareasFiltroColaboradorClienteActividad = async (req, res) => {

    colaboradorFiltro = req.params.colaboradorFiltro;
    clienteFiltro = req.params.clienteFiltro;
    actividadFiltro = req.params.actividadFiltro;

    let consulta = await Tarea.find({ CLIENTE: clienteFiltro, OPERADOR: colaboradorFiltro, ACTIVIDAD: actividadFiltro }).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);

}

/* Listar todas las tareas de la base de datos */
const listarTareasFiltroCliente = async (req, res) => {

    clienteFiltro = req.params.clienteFiltro;

    let consulta = await Tarea.find({ CLIENTE: clienteFiltro }).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);

}

/* Listar todas las tareas de la base de datos */
const listarTareasFiltroActividad = async (req, res) => {

    clienteFiltro = req.params.clienteFiltro;
    actividadFiltro = req.params.actividadFiltro;

    let consulta = await Tarea.find({ CLIENTE: clienteFiltro, ACTIVIDAD: actividadFiltro }).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);


}

/* Listar todas las tareas de la base de datos recibiendo cliente actividad y colaborador */
const listarTareasFiltroActividadColaborador = async (req, res) => {

    clienteFiltro = req.params.clienteFiltro;
    actividadFiltro = req.params.actividadFiltro;
    colaboradorFiltro = req.params.colaboradorFiltro;

    let consulta = await Tarea.find({ CLIENTE: clienteFiltro, ACTIVIDAD: actividadFiltro, OPERADOR: colaboradorFiltro }).sort({ NOMBRE_TAREA: "desc" }).exec();

    if (!consulta) return res.status(400).json({ status: false, mensaje: "Error al consultar BD" });
    return res.status(200).send(consulta);


}

/* Busca y devuelve la tarea recibiendo por body el id de la tarea */
const obtenerTarea = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    let tarea = await Tarea.findById(proyectoId).exec();

    if (!tarea) return res.status(400).json({ status: false, mensaje: "Tarea no encontrada" });

    return res.status(200).send(tarea);

}

/* Da de alta un articulo recibiendo los datos desde un form */
const altaTarea = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    //valido los datos
    try {
        validarTarea(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos!!!"
        });
    }

    //const isTarea= await  Tarea.findOne({ "NOMBRE_TAREA": elementos_recibidos.NOMBRE_TAREA }).exec();

    //if(isTarea) return res.status(400).json({status: false, mensaje:"Usuario existente"});

    //creo el objeto y le asigno los elementos recibidos
    const tarea = new Tarea(elementos_recibidos);
    //Asigno valores a objeto basado en el modelo (manual o automatico)
    //Guardar el articulo en base de datos
    const newTarea = await tarea.save();
    if (!newTarea) return res.status(400).json({ status: false, mensaje: "Error al dar de alta la tarea" });

    return res.status(200).send(newTarea);
}

/* Borrar una tarea recibiendo por body el id de la tarea */
const borrarTarea = async (req, res) => {

    proyectoId = req.params.id;

    if (proyectoId == null) {
        return res.status(500).json({
            status: "error",
            message: "id no recibido"
        });
    }

    const delTarea = await Tarea.findOneAndDelete({ _id: proyectoId }).exec();

    if (!delTarea) return res.status(400).json({ status: false, mensaje: "Error al borrar la Tarea" });

    return res.status(200).send(delTarea);
}

/* Actualizar una tarea recibiendo por body el id de la tarea */
const editarTarea = (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;
    proyectoId = elementos_recibidos.id;

    //valido los datos
    try {
        validarTarea(elementos_recibidos);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al validar los datos"
        });
    }

    //creo el objeto y le asigno los elementos recibidos
    var tareaUpdate = {

        NOMBRE_TAREA: { type: String, required: true },
        CLIENTE: { type: String, required: true },
        PRODUCTO_CLIENTE: { type: String, required: true },
        ACTIVIDAD: { type: String, required: true },
        TIPOIMPRESION: { type: String, required: false },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        CANTIDAD: { type: Number, required: true },
        UNIDAD: { type: String, required: true },
        FECHA_ASIGNACION: { type: String, required: false },
        HORA_ASIGNACION: { type: String, required: false },
        TURNO: { type: String, required: false },
        EQUIPAMIENTO: { type: String, required: false },
        OPERADOR: { type: String, required: false },
        NOMBRE_ASIGNADOR: { type: String, required: false },
        FECHA_INICIO_EJECUCION: { type: String, required: false },
        HORA_INICIO_EJECUCION: { type: String, required: false },
        OPERADOR_ASISTENTE: { type: String, required: false },
        COMPLEJIDAD: { type: String, required: false },
        FECHA_FIN_EJECUCION: { type: String, required: false },
        HORA_FIN_EJECUCION: { type: String, required: false },
        ESTADO: { type: String, required: false }

    };

    //Asigno valores a objeto basado en el modelo (manual o automatico)
    tareaUpdate.NOMBRE_TAREA = elementos_recibidos.NOMBRE_TAREA;
    tareaUpdate.CLIENTE = elementos_recibidos.CLIENTE;
    tareaUpdate.PRODUCTO_CLIENTE = elementos_recibidos.PRODUCTO_CLIENTE;
    tareaUpdate.ACTIVIDAD = elementos_recibidos.ACTIVIDAD;
    tareaUpdate.TIPOIMPRESION = elementos_recibidos.TIPOIMPRESION;
    tareaUpdate.FECHA_CREACION = elementos_recibidos.FECHA_CREACION;
    tareaUpdate.HORA_CREACION = elementos_recibidos.HORA_CREACION;
    tareaUpdate.CANTIDAD = elementos_recibidos.CANTIDAD;
    tareaUpdate.UNIDAD = elementos_recibidos.UNIDAD;
    tareaUpdate.FECHA_ASIGNACION = elementos_recibidos.FECHA_ASIGNACION;
    tareaUpdate.HORA_ASIGNACION = elementos_recibidos.HORA_ASIGNACION;
    tareaUpdate.TURNO = elementos_recibidos.TURNO;
    tareaUpdate.EQUIPAMIENTO = elementos_recibidos.EQUIPAMIENTO;
    tareaUpdate.OPERADOR = elementos_recibidos.OPERADOR;
    tareaUpdate.NOMBRE_ASIGNADOR = elementos_recibidos.NOMBRE_ASIGNADOR;
    tareaUpdate.FECHA_INICIO_EJECUCION = elementos_recibidos.FECHA_INICIO_EJECUCION;
    tareaUpdate.HORA_INICIO_EJECUCION = elementos_recibidos.HORA_INICIO_EJECUCION;
    tareaUpdate.OPERADOR_ASISTENTE = elementos_recibidos.OPERADOR_ASISTENTE;
    tareaUpdate.COMPLEJIDAD = elementos_recibidos.COMPLEJIDAD;
    tareaUpdate.FECHA_FIN_EJECUCION = elementos_recibidos.FECHA_FIN_EJECUCION;
    tareaUpdate.HORA_FIN_EJECUCION = elementos_recibidos.HORA_FIN_EJECUCION;
    tareaUpdate.ESTADO = elementos_recibidos.ESTADO;

    //Guardar el articulo en base de datos
    Tarea.findOneAndUpdate({ _id: proyectoId }, tareaUpdate, { new: true })
        .then((tareaGuardada) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                tarea: tareaGuardada
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "Error al modificar la tarea"
            });
        })
}

/* Actualizo un array de tareas recibiendas por body para la asignacion */
const editarTareasSeleccionadas = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    var tareaUpdate = {

        NOMBRE_TAREA: { type: String, required: true },
        CLIENTE: { type: String, required: true },
        PRODUCTO_CLIENTE: { type: String, required: true },
        ACTIVIDAD: { type: String, required: true },
        TIPOIMPRESION: { type: String, required: false },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        CANTIDAD: { type: Number, required: true },
        UNIDAD: { type: String, required: true },
        FECHA_ASIGNACION: { type: String, required: false },
        HORA_ASIGNACION: { type: String, required: false },
        TURNO: { type: String, required: false },
        EQUIPAMIENTO: { type: String, required: false },
        OPERADOR: { type: String, required: false },
        NOMBRE_ASIGNADOR: { type: String, required: false },
        FECHA_INICIO_EJECUCION: { type: String, required: false },
        HORA_INICIO_EJECUCION: { type: String, required: false },
        OPERADOR_ASISTENTE: { type: String, required: false },
        COMPLEJIDAD: { type: String, required: false },
        FECHA_FIN_EJECUCION: { type: String, required: false },
        HORA_FIN_EJECUCION: { type: String, required: false },
        ESTADO: { type: String, required: false }

    };

    TAREASSELECCIONADASRECIBIDAS = elementos_recibidos.TAREASSELECCIONADAS;

    for (var i = 0; i < TAREASSELECCIONADASRECIBIDAS.length; i++) {
        if (TAREASSELECCIONADASRECIBIDAS[i].ESTADO !== "Iniciado") {
            //Asigno valores a objeto basado en el modelo (manual o automatico)
            proyectoId = TAREASSELECCIONADASRECIBIDAS[i]._id;
            tareaUpdate.NOMBRE_TAREA = TAREASSELECCIONADASRECIBIDAS[i].NOMBRE_TAREA;
            tareaUpdate.CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].CLIENTE;
            tareaUpdate.PRODUCTO_CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].PRODUCTO_CLIENTE;
            tareaUpdate.ACTIVIDAD = TAREASSELECCIONADASRECIBIDAS[i].ACTIVIDAD;
            if(elementos_recibidos.TIPOIMPRESIONUPDATE===""){
                tareaUpdate.TIPOIMPRESION = TAREASSELECCIONADASRECIBIDAS[i].TIPOIMPRESION;
            }else{
                tareaUpdate.TIPOIMPRESION = elementos_recibidos.TIPOIMPRESIONUPDATE;
            }
            tareaUpdate.FECHA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_CREACION;
            tareaUpdate.HORA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].HORA_CREACION;
            tareaUpdate.CANTIDAD = TAREASSELECCIONADASRECIBIDAS[i].CANTIDAD;
            tareaUpdate.UNIDAD = TAREASSELECCIONADASRECIBIDAS[i].UNIDAD;
            tareaUpdate.FECHA_ASIGNACION = elementos_recibidos.FECHA_ASIGNACIONUPDATE;
            tareaUpdate.HORA_ASIGNACION = elementos_recibidos.HORA_ASIGNACIONUPDATE;
            tareaUpdate.TURNO = elementos_recibidos.TURNOUPDATE;
            tareaUpdate.EQUIPAMIENTO = elementos_recibidos.EQUIPAMIENTOUPDATE;
            tareaUpdate.OPERADOR = elementos_recibidos.OPERADORUPDATE;
            tareaUpdate.NOMBRE_ASIGNADOR = elementos_recibidos.NOMBRE_ASIGNADORUPDATE;
            tareaUpdate.FECHA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_INICIO_EJECUCION;
            tareaUpdate.HORA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_INICIO_EJECUCION;
            tareaUpdate.OPERADOR_ASISTENTE = elementos_recibidos.OPERADOR_ASISTENTEUPDATE;
            tareaUpdate.COMPLEJIDAD = TAREASSELECCIONADASRECIBIDAS[i].COMPLEJIDAD;
            tareaUpdate.FECHA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_FIN_EJECUCION;
            tareaUpdate.HORA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_FIN_EJECUCION;
            tareaUpdate.ESTADO = elementos_recibidos.ESTADOUPDATE;

            //Guardar el articulo en base de datos
            const updateTarea = await Tarea.findOneAndUpdate({ _id: proyectoId }, tareaUpdate, { new: true }).exec();
            if (!updateTarea) return res.status(400).json({ status: false, mensaje: "Error al modificar la Tarea" });
        }

    }

    return res.status(200).json({
        status: "success",
    });
}

/* Actualizo un array de tareas recibiendas por body para la asignacion */
const editarTareasSeleccionadasInicio = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    var tareaUpdate = {

        NOMBRE_TAREA: { type: String, required: true },
        CLIENTE: { type: String, required: true },
        PRODUCTO_CLIENTE: { type: String, required: true },
        ACTIVIDAD: { type: String, required: true },
        TIPOIMPRESION: { type: String, required: false },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        CANTIDAD: { type: Number, required: true },
        UNIDAD: { type: String, required: true },
        FECHA_ASIGNACION: { type: String, required: false },
        HORA_ASIGNACION: { type: String, required: false },
        TURNO: { type: String, required: false },
        EQUIPAMIENTO: { type: String, required: false },
        OPERADOR: { type: String, required: false },
        NOMBRE_ASIGNADOR: { type: String, required: false },
        FECHA_INICIO_EJECUCION: { type: String, required: false },
        HORA_INICIO_EJECUCION: { type: String, required: false },
        OPERADOR_ASISTENTE: { type: String, required: false },
        COMPLEJIDAD: { type: String, required: false },
        FECHA_FIN_EJECUCION: { type: String, required: false },
        HORA_FIN_EJECUCION: { type: String, required: false },
        ESTADO: { type: String, required: false }

    };

    TAREASSELECCIONADASRECIBIDAS = elementos_recibidos.TAREASSELECCIONADAS;

    for (var i = 0; i < TAREASSELECCIONADASRECIBIDAS.length; i++) {
        //Asigno valores a objeto basado en el modelo (manual o automatico)
        proyectoId = TAREASSELECCIONADASRECIBIDAS[i]._id;
        tareaUpdate.NOMBRE_TAREA = TAREASSELECCIONADASRECIBIDAS[i].NOMBRE_TAREA;
        tareaUpdate.CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].CLIENTE;
        tareaUpdate.PRODUCTO_CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].PRODUCTO_CLIENTE;
        tareaUpdate.ACTIVIDAD = TAREASSELECCIONADASRECIBIDAS[i].ACTIVIDAD;
        tareaUpdate.TIPOIMPRESION = TAREASSELECCIONADASRECIBIDAS[i].TIPOIMPRESION;
        tareaUpdate.FECHA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_CREACION;
        tareaUpdate.HORA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].HORA_CREACION;
        tareaUpdate.CANTIDAD = TAREASSELECCIONADASRECIBIDAS[i].CANTIDAD;
        tareaUpdate.UNIDAD = TAREASSELECCIONADASRECIBIDAS[i].UNIDAD;
        tareaUpdate.FECHA_ASIGNACION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_ASIGNACION;
        tareaUpdate.HORA_ASIGNACION = TAREASSELECCIONADASRECIBIDAS[i].HORA_ASIGNACION;
        tareaUpdate.TURNO = TAREASSELECCIONADASRECIBIDAS[i].TURNO;
        tareaUpdate.EQUIPAMIENTO = TAREASSELECCIONADASRECIBIDAS[i].EQUIPAMIENTO;
        tareaUpdate.OPERADOR = TAREASSELECCIONADASRECIBIDAS[i].OPERADOR;
        tareaUpdate.NOMBRE_ASIGNADOR = TAREASSELECCIONADASRECIBIDAS[i].NOMBRE_ASIGNADOR;
        if (TAREASSELECCIONADASRECIBIDAS[i].FECHA_INICIO_EJECUCION === "") {
            tareaUpdate.FECHA_INICIO_EJECUCION = elementos_recibidos.FECHA_INICIO_EJECUCIONUPDATE;

        } else {
            tareaUpdate.FECHA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_INICIO_EJECUCION;
        }
        //tareaUpdate.FECHA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_INICIO_EJECUCION===""?elementos_recibidos.FECHA_INICIO_EJECUCIONUPDATE:TAREASSELECCIONADASRECIBIDAS[i].FECHA_INICIO_EJECUCION;
        if (TAREASSELECCIONADASRECIBIDAS[i].HORA_INICIO_EJECUCION === "") {
            tareaUpdate.HORA_INICIO_EJECUCION = elementos_recibidos.HORA_INICIO_EJECUCIONUPDATE;

        } else {
            tareaUpdate.HORA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_INICIO_EJECUCION;
        }
        //tareaUpdate.HORA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_FIN_EJECUCION===""?elementos_recibidos.HORA_INICIO_EJECUCIONUPDATE:TAREASSELECCIONADASRECIBIDAS[i].HORA_FIN_EJECUCION;
        tareaUpdate.OPERADOR_ASISTENTE = TAREASSELECCIONADASRECIBIDAS[i].OPERADOR_ASISTENTE;
        tareaUpdate.COMPLEJIDAD = TAREASSELECCIONADASRECIBIDAS[i].COMPLEJIDAD;
        tareaUpdate.FECHA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_FIN_EJECUCION;
        tareaUpdate.HORA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_FIN_EJECUCION;
        tareaUpdate.ESTADO = elementos_recibidos.ESTADOUPDATE;

        //Guardar el articulo en base de datos
        const updateTarea = await Tarea.findOneAndUpdate({ _id: proyectoId }, tareaUpdate, { new: true }).exec();
        if (!updateTarea) return res.status(400).json({ status: false, mensaje: "Error al modificar la Tarea" });

    }

    return res.status(200).json({
        status: "success",
    });
}

/* Actualizo un array de tareas recibiendas por body para la asignacion */
const editarTareasSeleccionadasFinTurno = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    var tareaUpdate = {

        NOMBRE_TAREA: { type: String, required: true },
        CLIENTE: { type: String, required: true },
        PRODUCTO_CLIENTE: { type: String, required: true },
        ACTIVIDAD: { type: String, required: true },
        TIPOIMPRESION: { type: String, required: false },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        CANTIDAD: { type: Number, required: true },
        UNIDAD: { type: String, required: true },
        FECHA_ASIGNACION: { type: String, required: false },
        HORA_ASIGNACION: { type: String, required: false },
        TURNO: { type: String, required: false },
        EQUIPAMIENTO: { type: String, required: false },
        OPERADOR: { type: String, required: false },
        NOMBRE_ASIGNADOR: { type: String, required: false },
        FECHA_INICIO_EJECUCION: { type: String, required: false },
        HORA_INICIO_EJECUCION: { type: String, required: false },
        OPERADOR_ASISTENTE: { type: String, required: false },
        COMPLEJIDAD: { type: String, required: false },
        FECHA_FIN_EJECUCION: { type: String, required: false },
        HORA_FIN_EJECUCION: { type: String, required: false },
        ESTADO: { type: String, required: false }

    };

    TAREASSELECCIONADASRECIBIDAS = elementos_recibidos.TAREASSELECCIONADAS;

    for (var i = 0; i < TAREASSELECCIONADASRECIBIDAS.length; i++) {
        if (TAREASSELECCIONADASRECIBIDAS[i].ESTADO === "Asignado") {
            //Asigno valores a objeto basado en el modelo (manual o automatico)
            proyectoId = TAREASSELECCIONADASRECIBIDAS[i]._id;
            tareaUpdate.NOMBRE_TAREA = TAREASSELECCIONADASRECIBIDAS[i].NOMBRE_TAREA;
            tareaUpdate.CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].CLIENTE;
            tareaUpdate.PRODUCTO_CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].PRODUCTO_CLIENTE;
            tareaUpdate.ACTIVIDAD = TAREASSELECCIONADASRECIBIDAS[i].ACTIVIDAD;
            tareaUpdate.TIPOIMPRESION = TAREASSELECCIONADASRECIBIDAS[i].TIPOIMPRESION;
            tareaUpdate.FECHA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_CREACION;
            tareaUpdate.HORA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].HORA_CREACION;
            tareaUpdate.CANTIDAD = TAREASSELECCIONADASRECIBIDAS[i].CANTIDAD;
            tareaUpdate.UNIDAD = TAREASSELECCIONADASRECIBIDAS[i].UNIDAD;

            tareaUpdate.FECHA_ASIGNACION = elementos_recibidos.FECHA_ASIGNACIONUPDATE;
            tareaUpdate.HORA_ASIGNACION = elementos_recibidos.HORA_ASIGNACIONUPDATE;
            tareaUpdate.TURNO = elementos_recibidos.TURNOUPDATE;
            tareaUpdate.EQUIPAMIENTO = elementos_recibidos.EQUIPAMIENTOUPDATE;
            tareaUpdate.OPERADOR = elementos_recibidos.OPERADORUPDATE;
            tareaUpdate.NOMBRE_ASIGNADOR = elementos_recibidos.NOMBRE_ASIGNADORUPDATE;

            tareaUpdate.FECHA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_INICIO_EJECUCION;
            tareaUpdate.HORA_INICIO_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_INICIO_EJECUCION;
            tareaUpdate.OPERADOR_ASISTENTE = TAREASSELECCIONADASRECIBIDAS[i].OPERADOR_ASISTENTE;
            tareaUpdate.COMPLEJIDAD = TAREASSELECCIONADASRECIBIDAS[i].COMPLEJIDAD;
            tareaUpdate.FECHA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_FIN_EJECUCION;
            tareaUpdate.HORA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_FIN_EJECUCION;
            tareaUpdate.ESTADO = elementos_recibidos.ESTADOUPDATE;

            //Guardar el articulo en base de datos
            const updateTarea = await Tarea.findOneAndUpdate({ _id: proyectoId }, tareaUpdate, { new: true }).exec();
            if (!updateTarea) return res.status(400).json({ status: false, mensaje: "Error al modificar la Tarea" });
        }
    }

    return res.status(200).json({
        status: "success",
    });
}

/* Actualizo un array de tareas recibiendas por body para las pausas */
const editarTareasSeleccionadasPausa = async (req, res) => {
    //recogo los parametros a guardar
    let elementos_recibidos = req.body;

    var tareaUpdate = {

        NOMBRE_TAREA: { type: String, required: true },
        CLIENTE: { type: String, required: true },
        PRODUCTO_CLIENTE: { type: String, required: true },
        ACTIVIDAD: { type: String, required: true },
        TIPOIMPRESION: { type: String, required: false },
        FECHA_CREACION: { type: String, required: true },
        HORA_CREACION: { type: String, required: true },
        CANTIDAD: { type: Number, required: true },
        UNIDAD: { type: String, required: true },
        FECHA_ASIGNACION: { type: String, required: false },
        HORA_ASIGNACION: { type: String, required: false },
        TURNO: { type: String, required: false },
        EQUIPAMIENTO: { type: String, required: false },
        OPERADOR: { type: String, required: false },
        NOMBRE_ASIGNADOR: { type: String, required: false },
        FECHA_INICIO_EJECUCION: { type: String, required: false },
        HORA_INICIO_EJECUCION: { type: String, required: false },
        OPERADOR_ASISTENTE: { type: String, required: false },
        COMPLEJIDAD: { type: String, required: false },
        FECHA_FIN_EJECUCION: { type: String, required: false },
        HORA_FIN_EJECUCION: { type: String, required: false },
        ESTADO: { type: String, required: false }

    };

    TAREASSELECCIONADASRECIBIDAS = elementos_recibidos.TAREASSELECCIONADAS;

    for (var i = 0; i < TAREASSELECCIONADASRECIBIDAS.length; i++) {
        //Asigno valores a objeto basado en el modelo (manual o automatico)
        proyectoId = TAREASSELECCIONADASRECIBIDAS[i]._id;
        tareaUpdate.NOMBRE_TAREA = TAREASSELECCIONADASRECIBIDAS[i].NOMBRE_TAREA;
        tareaUpdate.CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].CLIENTE;
        tareaUpdate.PRODUCTO_CLIENTE = TAREASSELECCIONADASRECIBIDAS[i].PRODUCTO_CLIENTE;
        tareaUpdate.ACTIVIDAD = TAREASSELECCIONADASRECIBIDAS[i].ACTIVIDAD;
        tareaUpdate.TIPOIMPRESION = TAREASSELECCIONADASRECIBIDAS[i].TIPOIMPRESION;
        tareaUpdate.FECHA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_CREACION;
        tareaUpdate.HORA_CREACION = TAREASSELECCIONADASRECIBIDAS[i].HORA_CREACION;
        tareaUpdate.CANTIDAD = elementos_recibidos.CANTIDADUPDATE;
        tareaUpdate.UNIDAD = TAREASSELECCIONADASRECIBIDAS[i].UNIDAD;
        tareaUpdate.FECHA_ASIGNACION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_ASIGNACION;
        tareaUpdate.HORA_ASIGNACION = TAREASSELECCIONADASRECIBIDAS[i].HORA_ASIGNACION;
        tareaUpdate.TURNO = TAREASSELECCIONADASRECIBIDAS[i].TURNO;
        tareaUpdate.EQUIPAMIENTO = TAREASSELECCIONADASRECIBIDAS[i].EQUIPAMIENTO;
        tareaUpdate.OPERADOR = TAREASSELECCIONADASRECIBIDAS[i].OPERADOR;
        tareaUpdate.NOMBRE_ASIGNADOR = TAREASSELECCIONADASRECIBIDAS[i].NOMBRE_ASIGNADOR;
        tareaUpdate.FECHA_INICIO_EJECUCION = elementos_recibidos.FECHA_INICIO_EJECUCIONUPDATE;
        tareaUpdate.HORA_INICIO_EJECUCION = elementos_recibidos.HORA_INICIO_EJECUCIONUPDATE;
        tareaUpdate.OPERADOR_ASISTENTE = TAREASSELECCIONADASRECIBIDAS[i].OPERADOR_ASISTENTE;
        tareaUpdate.COMPLEJIDAD = TAREASSELECCIONADASRECIBIDAS[i].COMPLEJIDAD;
        tareaUpdate.FECHA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].FECHA_FIN_EJECUCION;
        tareaUpdate.HORA_FIN_EJECUCION = TAREASSELECCIONADASRECIBIDAS[i].HORA_FIN_EJECUCION;
        tareaUpdate.ESTADO = elementos_recibidos.ESTADOUPDATE;

        //Guardar el articulo en base de datos
        const updateTarea = await Tarea.findOneAndUpdate({ _id: proyectoId }, tareaUpdate, { new: true }).exec();
        if (!updateTarea) return res.status(400).json({ status: false, mensaje: "Error al modificar la Tarea" });

    }

    return res.status(200).json({
        status: "success",
    });
}

module.exports = {
    listarTareas,
    altaTarea,
    obtenerTarea,
    borrarTarea,
    editarTarea,
    listarTareasFiltroCliente,
    listarTareasFiltroActividad,
    editarTareasSeleccionadas,
    listarTareasFiltroActividadColaborador,
    listarTareasFiltroColaborador,
    listarTareasFiltroColaboradorCliente,
    listarTareasFiltroColaboradorClienteActividad,
    editarTareasSeleccionadasInicio,
    editarTareasSeleccionadasPausa,
    editarTareasSeleccionadasFinTurno
}