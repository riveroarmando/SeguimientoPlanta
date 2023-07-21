const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addError = require("ajv-errors");

const ajv = new Ajv({ allErrors: true });
// Ajv option allErrors is required
//require("ajv-errors")(ajv /*, {singleError: true} */)
addFormats(ajv);
addError(ajv);

/*Para autinticar por token */
const jose = require("jose");

const LoginDTOSchema = {
    type: "object",
    required: ["NOMBRE_USUARIO", "PASSWORD"],
    allOf: [
        {
            properties: {
                NOMBRE_USUARIO: { type: "string", minLength: 4 },
                PASSWORD: { type: "string", minLength: 4 },
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

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({
        status: false,
        mensaje: "Usuario no autentificado desde DTO"
    });

    //Saco el bearer de la cabecera
    const jwt = authorization.split(' ')[1];
    if (!jwt) return res.status(401).json({ status: false, mensaje: "Usuario no autentificado desde DTO" });

    try {
        const encoder = new TextEncoder();
        const jwtData = await jose.jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.ID = jwtData.payload.ID;

        //console.log(req.ID);

        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Usuario no autenticado desde DTO"
        });
    }
}

module.exports = {
    userJWTDTO
}