const express = require("express");
const router = express.Router();
const validarDTO = require("../DTO/validar_login_dto");
const validarJWTDTO=require("../DTO/user_jwt_dto");

/* Esto es para las imagenes */
const multer = require("multer");
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./imagenes/colaboradores/");
    },
    filename: (req, file, cb) => {
        let archivo_sin_espacios = file.originalname.replace(/ /g, "");
        cb(null, archivo_sin_espacios);
    }
});

const subidas = multer({ storage: almacenamiento });
/* Hasta aca imagenes */

const ColaboradorControlador = require("../controladores/colaborador");

    //rutas
    router.get("/colaboradores", validarJWTDTO.userJWTDTO, ColaboradorControlador.listarColaboradores);
    router.get("/obtener-colaborador/:id?", validarJWTDTO.userJWTDTO, ColaboradorControlador.obtenerColaborador);
    router.post("/alta-colaborador", validarJWTDTO.userJWTDTO, ColaboradorControlador.altaColaborador);
    router.delete("/borrar-colaborador/:id", validarJWTDTO.userJWTDTO, ColaboradorControlador.borrarColaborador);
    router.put("/editar-colaborador", validarJWTDTO.userJWTDTO, ColaboradorControlador.editarColaborador);
    router.post("/subir-imagen-colaborador/:id", [subidas.single("IMAGEN")], ColaboradorControlador.subirImagenColaborador);
    router.get("/obtener-imagen-colaborador/:IMAGEN", ColaboradorControlador.obtenerImagenColaborador);
    router.post("/login-sesion", ColaboradorControlador.loginColaboradorSesion);
    router.get("/perfil", ColaboradorControlador.obtenerPerfilColaboradorSesion);
    router.post("/login-token", validarDTO.validarLoginColaboradorDTO, ColaboradorControlador.loginColaboradorToken);
    router.get("/perfilToken", validarJWTDTO.userJWTDTO, ColaboradorControlador.obtenerPerfilColaboradorToken);

module.exports = router;