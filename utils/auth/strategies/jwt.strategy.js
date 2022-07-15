// Archivo para estrategia de verificación de JWT de passport [https://www.passportjs.org/packages/]

// Se importa la estratagia de verificación de JWT
const { Strategy, ExtractJwt } = require('passport-jwt');

// Se importa la configuración para obtener las variables de ambiente
const { config } = require('./../../../config/config');

// Se crean las opciones en las que se le envia el Token desde el header y la clave secreta
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

// Se le envian los datos a la estrategia y tenemos como devuelta el payload del JWT
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

// Se exporta la estrategia
module.exports = JwtStrategy;
