const express = require("express");
const router=express.Router();

/* Esto es para las imagenes */
const multer = require("multer");
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./imagenes/clientes/");
    },
    filename: (req, file, cb) => {
        let archivo_sin_espacios=file.originalname.replace(/ /g, "");
        cb(null, archivo_sin_espacios);
    }
});

const subidas = multer({storage: almacenamiento});
/* Hasta aca imagenes */

const ClienteControlador=require("../controladores/cliente");

//rutas
router.get("/clientes", ClienteControlador.listarClientes);
router.get("/obtener-cliente/:id", ClienteControlador.obtenerCliente);
router.post("/alta-cliente", ClienteControlador.altaCliente);
router.delete("/borrar-cliente/:id", ClienteControlador.borrarCliente);
router.put("/editar-cliente", ClienteControlador.editarCliente);
router.post("/subir-imagen-cliente", [subidas.single("file")] ,ClienteControlador.subirImagenCliente);
router.get("/obtener-imagen-cliente", ClienteControlador.obtenerImagenCliente);


module.exports=router;