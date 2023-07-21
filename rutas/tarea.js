const express = require("express");
const router=express.Router();
const validarJWTDTO=require("../DTO/user_jwt_dto");

const TareaControlador=require("../controladores/tarea");

//rutas
router.get("/tareas", validarJWTDTO.userJWTDTO, TareaControlador.listarTareas);
router.get("/obtener-tarea/:id", validarJWTDTO.userJWTDTO, TareaControlador.obtenerTarea);
router.post("/alta-tarea", validarJWTDTO.userJWTDTO, TareaControlador.altaTarea);
router.delete("/borrar-tarea/:id", validarJWTDTO.userJWTDTO, TareaControlador.borrarTarea);
router.put("/editar-tarea", validarJWTDTO.userJWTDTO, TareaControlador.editarTarea);
router.get("/tareas/:clienteFiltro", validarJWTDTO.userJWTDTO, TareaControlador.listarTareasFiltroCliente);
router.get("/tareas/:clienteFiltro/:actividadFiltro", validarJWTDTO.userJWTDTO, TareaControlador.listarTareasFiltroActividad);
router.get("/tareas/:clienteFiltro/:actividadFiltro/:colaboradorFiltro", validarJWTDTO.userJWTDTO, TareaControlador.listarTareasFiltroActividadColaborador);
router.get("/tareasColaborador/:colaboradorFiltro", validarJWTDTO.userJWTDTO, TareaControlador.listarTareasFiltroColaborador);
router.get("/tareasColaborador/:colaboradorFiltro/:clienteFiltro", validarJWTDTO.userJWTDTO, TareaControlador.listarTareasFiltroColaboradorCliente);
router.get("/tareasColaborador/:colaboradorFiltro/:clienteFiltro/:actividadFiltro", validarJWTDTO.userJWTDTO, TareaControlador.listarTareasFiltroColaboradorClienteActividad);
router.put("/editar-tareas-seleccionadas", validarJWTDTO.userJWTDTO, TareaControlador.editarTareasSeleccionadas);
router.put("/editar-tareas-seleccionadas-inicio", validarJWTDTO.userJWTDTO, TareaControlador.editarTareasSeleccionadasInicio);
router.put("/editar-tareas-seleccionadas-FinTurno", validarJWTDTO.userJWTDTO, TareaControlador.editarTareasSeleccionadasFinTurno);
router.put("/editar-tareas-seleccionadas-pausa", validarJWTDTO.userJWTDTO, TareaControlador.editarTareasSeleccionadasPausa);


module.exports=router;
