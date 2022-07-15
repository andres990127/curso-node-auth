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

// Se crea middleware para verificar que el usuario logeado sea admin
function checkAdminRole(req, res, next){
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

// [Clousures --> Función que retorna una función]
// Se crea middleware para verificar que alguno de los roles que se le ingresen los tenga el usuario
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

// Se exporta el modulo
module.exports = { checkApiKey, checkAdminRole, checkRoles}
