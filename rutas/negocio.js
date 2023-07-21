const express = require("express");
const router=express.Router();
const validarJWTDTO=require("../DTO/user_jwt_dto");

const NegocioControlador=require("../controladores/negocio");

//rutas
router.get("/negocios", validarJWTDTO.userJWTDTO, NegocioControlador.listarNegocios);
router.get("/obtener-negocio/:id", validarJWTDTO.userJWTDTO, NegocioControlador.obtenerNegocio);
router.post("/alta-negocio", validarJWTDTO.userJWTDTO, NegocioControlador.altaNegocio);
router.delete("/borrar-negocio/:id", validarJWTDTO.userJWTDTO, NegocioControlador.borrarNegocio);
router.put("/editar-negocio", validarJWTDTO.userJWTDTO, NegocioControlador.editarNegocio);
router.get("/negocios/:clienteFiltro/:productoFiltro", validarJWTDTO.userJWTDTO, NegocioControlador.listarNegociosFiltroClienteProducto);



module.exports=router;