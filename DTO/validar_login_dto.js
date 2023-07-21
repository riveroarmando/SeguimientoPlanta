//const {Type} = require("@sinclair/typebox");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addError =  require("ajv-errors");

const ajv = new Ajv({allErrors: true});
// Ajv option allErrors is required
//require("ajv-errors")(ajv /*, {singleError: true} */)
addFormats(ajv);
addError(ajv);

const LoginDTOSchema = {
    type: "object",
    required: ["NOMBRE_USUARIO", "PASSWORD"],
    allOf: [
      {
        properties: {
            NOMBRE_USUARIO: {type: "string", minLength: 4},
            PASSWORD: {type: "string", minLength: 4},
        },
        additionalProperties: false,
      },
    ],
    errorMessage: {
      type: "Los datos deben ser del tipo object",
      required: {
        NOMBRE_USUARIO: "Falta NOMBRE_USUARIO",
        PASSWORD: "Falta PASSWORD"
    },
      properties: {
        NOMBRE_USUARIO: "El nombre de usuario debe ser un string >= 4",
        PASSWORD: "El nombre de usuario debe ser un string >= 4",
      },
      additionalProperty: "Solo puede contener NOMBRE_USUARIO y PASSWORD",
      _: 'Debe llegar NOMBRE_USUARIO y PASSWORD solamente',
    },
  }

const validate = ajv.compile(LoginDTOSchema);

const validarLoginColaboradorDTO = (req, res, next) => {
    
    try {
        const isDTOValid=validate(req.body);
        if(!isDTOValid){
            return res.status(400).json({
                status: "error",
                mensaje: validate.errors
            });
        }
    
        next();    
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "El JSON de entrada no tiene el formato valido"
        });
    }

}

module.exports = {
    validarLoginColaboradorDTO
}