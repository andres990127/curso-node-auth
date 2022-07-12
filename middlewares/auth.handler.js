// Middleware para autenticaciones

// Se importa el gestor de errores
const boom = require('@hapi/boom');

// Se importa el modulo que obtiene las variables globales
const { config } = require('./../config/config');

// Se crea función para validar existencia de atributo "api" con valor "123" en el header
function checkApiKey(req, res, next){

  // Se obtiene el atributo "api" del header
  const apiKey = req.headers['api'];

  // Se valida que "api" tenga el valor "123", si no lo tiene se envia un error de no autorizado
  if(apiKey === config.apiKey){
    next();
  } else{
    next(boom.unauthorized());
  }
}

// Se exporta el modulo
module.exports = { checkApiKey }
