const { conexion } = require("./basededatos/conexion"); //para conectarme a mongodb
const express = require("express");  //Para crear el servidor

const cors = require("cors");
const cookieParser = require("cookie-parser");

/*Para levantar el archivo .env y poder utilizarlo */
/*Lo hago aca porque como el process el global lo utilizo en todo el proyecto */
const dotenv = require("dotenv");
dotenv.config();

/***Produccion***/
var path = require('path');
/****************/
/***************************************************/

//Conectar a la base de datos
conexion();

//Creo el servidor Node Js
const app = express();
const puerto = process.env.PUERTO;

//configuro cors
app.use(cors());

//Convertir body a objeto js
app.use(cookieParser());
app.use(express.json());  //no debo parsear los datos que me llegan como content-type app/json
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        //console.error(err);
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
});

app.use(express.urlencoded({ extended: true })); //Recibo los datos de un form standard y los convierto a json content-type form-urlencoded
//Crear rutas de tarea
const rutas_tarea = require("./rutas/tarea");
app.use("/", rutas_tarea);

//Crear rutas de actividad
const rutas_actividad = require("./rutas/actividad");
app.use("/", rutas_actividad);

//Crear rutas de cliente
const rutas_cliente = require("./rutas/cliente");
app.use("/", rutas_cliente);

//Crear rutas de equipamiento
const rutas_equipamiento = require("./rutas/equipamiento");
app.use("/", rutas_equipamiento);

//Crear rutas de colaborador
const rutas_colaborador = require("./rutas/colaborador");
app.use("/", rutas_colaborador);

//Crear rutas de historicos
const rutas_historico = require("./rutas/historico");
app.use("/", rutas_historico);

//Crear rutas de negocios
const rutas_negocio = require("./rutas/negocio");
app.use("/", rutas_negocio);

//Produccion
app.use(express.static(path.join(__dirname, 'client')));

//ruta principal
app.get("/", (req, res) => {
    return res.status(200).send(`
    <div>
        <h1>Uso API Rest seguimiento printcenter</h1>
    </div>
    `);
});


//Crear servidor y escuchar peticiones
app.listen(puerto, function check(error) {
    if (error) {
        console.log("Error servidor no levantado");
    } else {
        console.log("Servidor escuchando puerto " + puerto);
    }
});


