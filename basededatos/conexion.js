
//const mongoose = require("mongoose")
const  Mongoose=require("mongoose");

const conexion = async() =>{

    try{

        await Mongoose.connect(process.env.DB_URL);

        //Parametros dentro de objeto solo en caso de haber errores. SOn con, y entre {} ya que son un json
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log("Conectado correctamente a la base de datos printcenter");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = {
    conexion
}
