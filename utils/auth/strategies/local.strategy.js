// Archivo para estrategia de autenticación local de passport [https://www.passportjs.org/packages/]

// Se importa la estratagia de autenticación local de passport
const { Strategy } = require('passport-local');

// Se importa el gestor de errores
const boom = require('@hapi/boom');

// Se importa bcrypt para desencriptar hashes
const bcrypt = require('bcrypt');

// Importamos la clase de usuario para usar sus consultas
const UserService = require('./../../../services/user.service');

// Instanciamos una clase de servicio
const service = new UserService();

// Se define la estrategia
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
    // Se obtiene el usuario que tiene el correo que se envia
    const user = await service.findByEmail(email);

    // Si no existe usuario con ese correo enviado se devuelve un error de no autorización
    if (!user) {
      done(boom.unauthorized(), false);
    }

    // Si existe usuario entonces se verifica que la contraseña y el hash correspondan a un valor igual
    const isMatch = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide con la del usuario entonces se devuelve un error de no autorización
    if (!isMatch) {
      done(boom.unauthorized(), false);
    }

    // Se elimina el dato de password en la información de retorno al usuario
    delete user.dataValues.password;

    // Si el correo y la contraseña coinciden entonces se devuelve el usuario
    done(null, user);

  } catch (error) {
    done(error, false)
  };
});

// Se exporta la estrategia
module.exports = LocalStrategy;
