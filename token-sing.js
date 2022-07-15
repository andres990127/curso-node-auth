// Archivo para demostración de firma de un Json Web Token

// Se importa el modulo
const jwt = require('jsonwebtoken');

// Se define una clave secreta con el cual se firma el JWT
const secret = 'myCat';

// Se define la carga del JWS, siempre debe tener un "sub" que simboliza el identificador
const payload = {
  sub: 1,
  role: "customer",
};

// Se define una función para firmar y retornar el JWT
function signToken(payload, secret){
  return jwt.sign(payload, secret);
};

// Se crea una constante el cual almacena el JWT
const token = signToken(payload, secret);

// Se imprime el JWT
console.log(token);
