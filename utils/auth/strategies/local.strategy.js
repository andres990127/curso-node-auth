// Archivo para estrategia de autenticación local de passport [https://www.passportjs.org/packages/]

// Se importa la estratagia de autenticación local de passport
const { Strategy } = require('passport-local');

// Importamos el servicio de autenticación
const AuthService = require('./../../../services/auth.service');

// Instanciamos una clase de servicio
const service = new AuthService();

// Se define la estrategia
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
    // Se obtiene el usuario que tiene el correo que se envia
    const user = await service.getUser(email, password);

    // Si el correo y la contraseña coinciden entonces se devuelve el usuario
    done(null, user);

  } catch (error) {
    done(error, false)
  };
});

// Se exporta la estrategia
module.exports = LocalStrategy;
