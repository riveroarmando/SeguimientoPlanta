const express = require("express");
const router=express.Router();

/* Esto es para las imagenes */
const multer = require("multer");
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./imagenes/equipamientos/");
    },
    filename: (req, file, cb) => {
        let archivo_sin_espacios=file.originalname.replace(/ /g, "");
        cb(null, archivo_sin_espacios);
    }
});

const subidas = multer({storage: almacenamiento});
/* Hasta aca imagenes */

const EquipamientoControlador=require("../controladores/equipamiento");

//rutas
router.get("/equipamientos", EquipamientoControlador.listarEquipamientos);
router.get("/obtener-equipamiento/:id", EquipamientoControlador.obtenerEquipamiento);
router.post("/alta-equipamiento", EquipamientoControlador.altaEquipamiento);
router.delete("/borrar-equipamiento/:id", EquipamientoControlador.borrarEquipamiento);
router.put("/editar-equipamiento", EquipamientoControlador.editarEquipamiento);
router.post("/subir-imagen-equipamiento", [subidas.single("file")] ,EquipamientoControlador.subirImagenEquipamiento);
router.get("/obtener-imagen-equipamiento", EquipamientoControlador.obtenerImagenEquipamiento);


module.exports=router;