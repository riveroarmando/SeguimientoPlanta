const express = require("express");
const router=express.Router();
const validarJWTDTO=require("../DTO/user_jwt_dto");

const HistoricoControlador=require("../controladores/historico");


//rutas
router.get("/historicos", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareas);
router.get("/obtener-historico/:id", validarJWTDTO.userJWTDTO, HistoricoControlador.obtenerTarea);
router.post("/alta-historico", validarJWTDTO.userJWTDTO, HistoricoControlador.altaTarea);
router.delete("/borrar-historico/:id", validarJWTDTO.userJWTDTO, HistoricoControlador.borrarTarea);
router.put("/editar-historico", validarJWTDTO.userJWTDTO, HistoricoControlador.editarTarea);
router.get("/historicos/:clienteFiltro", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareasFiltroCliente);
router.get("/historicos/:clienteFiltro/:actividadFiltro", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareasFiltroActividad);
router.get("/historicos/:clienteFiltro/:actividadFiltro/:colaboradorFiltro", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareasFiltroActividadColaborador);
router.get("/historicosColaborador/:colaboradorFiltro", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareasFiltroColaborador);
router.get("/historicosColaborador/:colaboradorFiltro/:clienteFiltro", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareasFiltroColaboradorCliente);
router.get("/historicosColaborador/:colaboradorFiltro/:clienteFiltro/:actividadFiltro", validarJWTDTO.userJWTDTO, HistoricoControlador.listarTareasFiltroColaboradorClienteActividad);
router.put("/editar-historicos-seleccionadas", validarJWTDTO.userJWTDTO, HistoricoControlador.editarTareasSeleccionadas);
router.put("/editar-historicos-seleccionadas-inicio", validarJWTDTO.userJWTDTO, HistoricoControlador.editarTareasSeleccionadasInicio);


module.exports=router;
