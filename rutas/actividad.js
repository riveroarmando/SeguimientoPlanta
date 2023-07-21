const express = require("express");
const router=express.Router();

/* Esto es para las imagenes */
const multer = require("multer");
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./imagenes/actividades/");
    },
    filename: (req, file, cb) => {
        let archivo_sin_espacios=file.originalname.replace(/ /g, "");
        cb(null, archivo_sin_espacios);
    }
});

const subidas = multer({storage: almacenamiento});
/* Hasta aca imagenes */

const ActividadControlador=require("../controladores/actividad");

//rutas
router.get("/actividades/:cantidad?", ActividadControlador.listarActividades);
router.get("/obtener-actividad", ActividadControlador.obtenerActividad);
router.post("/alta-actividad", ActividadControlador.altaActividad);
router.delete("/borrar-actividad", ActividadControlador.borrarActividad);
router.put("/editar-actividad", ActividadControlador.editarActividad);
router.post("/subir-imagen-actividad", [subidas.single("file")] ,ActividadControlador.subirImagenActividad);
router.get("/obtener-imagen-actividad", ActividadControlador.obtenerImagenActividad);


module.exports=router;