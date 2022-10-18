//! Rutas protegidas , autenticacion   -> Manejo
//* Existe un token ?
//* Token pertenece a un usuario valido?
//* req.user solo  existe en rutas que vamos a proteger y
//! le agg la inf del tk desencriptada.

const { getUserById } = require('../users/users.controllers');
const JwtStrategy = require('passport-jwt').Strategy;

const EstractJwt = require('passport-jwt').ExtractJwt;
//* Extrae la parte de header autentication, y la parte header de jwt
// opc para controlar cómo se extrae el token de la solicitud o se verifica.

    module.exports = (passport) => {
        const obj = {
            jwtFromRequest: EstractJwt.fromAuthHeaderWithScheme('jwt'),
            //Busca en los header de auto.., y el q inicia por jwt, extrae el valor del tk
            secretOrKey: "root"
        }
        passport.use(
            new JwtStrategy(obj, async (decoded, done) => {
                //decoded, tk desencriptado
                //done (err, decoded)
                try {
                    const response = await getUserById(decoded.id)
                    if (!response) {
                        done(null,false)
                    }
                    console.log('decoded jwt', decoded)
                    return done(null,decoded)
                } catch (error) {
                    return done(err, false)
                }
            })
            //! token decodificado. luego controlador pa validar si user exist
        )
    }

//extractor , un obj rquest como argumento, devuelve " " JWT codificada o null.