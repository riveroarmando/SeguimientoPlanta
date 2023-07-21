const validator = require("validator");

const validarTarea = (elementos_recibidos) => {
    //valido los datos

    let validar_nombre_tarea = !validator.isEmpty(elementos_recibidos.NOMBRE_TAREA) && validator.isLength(elementos_recibidos.NOMBRE_TAREA, { min: 5, max: 200 });
    let validar_cliente = !validator.isEmpty(elementos_recibidos.CLIENTE);
    let validar_producto_cliente = !validator.isEmpty(elementos_recibidos.PRODUCTO_CLIENTE);
    let validar_actividad = !validator.isEmpty(elementos_recibidos.ACTIVIDAD);
    let validar_fecha_creacion = !validator.isEmpty(elementos_recibidos.FECHA_CREACION);
    let validar_hora_creacion = !validator.isEmpty(elementos_recibidos.HORA_CREACION);
    if(elementos_recibidos.CANTIDAD>0){
        var validar_cantidad = true;
    }
    let validar_unidad = !validator.isEmpty(elementos_recibidos.UNIDAD);
    
    if (!validar_nombre_tarea || !validar_cliente || !validar_producto_cliente || !validar_actividad || !validar_fecha_creacion || !validar_hora_creacion || !validar_cantidad || !validar_unidad) {
        console.log("Nombre Tarea");
        throw new Error("No se ha validado la informacion");
    }
}

const validarActividad = (elementos_recibidos) => {
    //valido los datos

    let validar_nombre_actividad = !validator.isEmpty(elementos_recibidos.NOMBRE_ACTIVIDAD) && validator.isLength(elementos_recibidos.NOMBRE_ACTIVIDAD, { min: 5, max: 200 });
    let validar_fecha_creacion = !validator.isEmpty(elementos_recibidos.FECHA_CREACION);
    let validar_hora_creacion = !validator.isEmpty(elementos_recibidos.HORA_CREACION);

    if (!validar_nombre_actividad || !validar_fecha_creacion || !validar_hora_creacion) {
        throw new Error("No se ha validado la informacion");
    }
}

const validarCliente = (elementos_recibidos) => {
    //valido los datos

    let validar_nombre_cliente = !validator.isEmpty(elementos_recibidos.NOMBRE_CLIENTE) && validator.isLength(elementos_recibidos.NOMBRE_CLIENTE, { min: 3, max: 200 });
    let validar_fecha_creacion = !validator.isEmpty(elementos_recibidos.FECHA_CREACION);
    let validar_hora_creacion = !validator.isEmpty(elementos_recibidos.HORA_CREACION);

    if (!validar_nombre_cliente || !validar_fecha_creacion || !validar_hora_creacion) {
        throw new Error("No se ha validado la informacion");
    }
}

const validarEquipamiento = (elementos_recibidos) => {
    //valido los datos

    let validar_nombre_equipamiento = !validator.isEmpty(elementos_recibidos.NOMBRE_EQUIPAMIENTO) && validator.isLength(elementos_recibidos.NOMBRE_EQUIPAMIENTO, { min: 3, max: 200 });
    let validar_fecha_creacion = !validator.isEmpty(elementos_recibidos.FECHA_CREACION);
    let validar_hora_creacion = !validator.isEmpty(elementos_recibidos.HORA_CREACION);

    if (!validar_nombre_equipamiento || !validar_fecha_creacion || !validar_hora_creacion) {
        throw new Error("No se ha validado la informacion");
    }
}

const validarColaborador = (elementos_recibidos) => {
    //valido los datos

    let validar_nombre_colaborador = !validator.isEmpty(elementos_recibidos.NOMBRE_COLABORADOR) && validator.isLength(elementos_recibidos.NOMBRE_COLABORADOR, { min: 3, max: 200 });
    let validar_nombre_usuario = !validator.isEmpty(elementos_recibidos.NOMBRE_USUARIO);
    let validar_fecha_creacion = !validator.isEmpty(elementos_recibidos.FECHA_CREACION);
    let validar_hora_creacion = !validator.isEmpty(elementos_recibidos.HORA_CREACION);
    let validar_turno = !validator.isEmpty(elementos_recibidos.TURNO);
    let validar_perfil = !validator.isEmpty(elementos_recibidos.PERFIL);
    let validar_password = !validator.isEmpty(elementos_recibidos.PASSWORD);

    if (!validar_nombre_colaborador || !validar_nombre_usuario || !validar_fecha_creacion || !validar_hora_creacion || !validar_turno || !validar_perfil || !validar_password) {
        throw new Error("No se ha validado la informacion");
    }
}

const validarNegocio = (elementos_recibidos) => {
    //valido los datos

    let validar_cliente = !validator.isEmpty(elementos_recibidos.CLIENTE) && validator.isLength(elementos_recibidos.CLIENTE, { min: 3, max: 200 });
    let validar_producto = !validator.isEmpty(elementos_recibidos.PRODUCTO);
    
    if (!validar_cliente || !validar_producto) {
        throw new Error("No se ha validado la informacion");
    }
}

const validarLoginColaborador = (elementos_recibidos) => {
    //valido los datos

    let validar_nombre_usuario = !validator.isEmpty(elementos_recibidos.NOMBRE_USUARIO);
    let validar_password = !validator.isEmpty(elementos_recibidos.PASSWORD);

    if (!validar_nombre_usuario || !validar_password) {
        throw new Error("No se ha validado la informacion");
    }
}

module.exports = {
    validarTarea,
    validarActividad,
    validarCliente,
    validarEquipamiento,
    validarColaborador,
    validarLoginColaborador,
    validarNegocio
}