// Archivo para demostración de verificación de firma de un Json Web Token

// Se importa el modulo
const jwt = require('jsonwebtoken');

// Se define una clave secreta con el cual se firma el JWT
const secret = 'myCat';

// Se define el token que vamos a verificar
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1NzgzNDY5OX0.hb_U7O7qI7ehRaecfydYj-YQNJT7dnkdhpdidtfG_dA';

// Se define una función para firmar y retornar el JWT
function verifyToken(token, secret){
  return jwt.verify(token, secret);
};

// Se crea una constante el cual almacena el JWT
const payload = verifyToken(token, secret);

// Se imprime el JWT
console.log(payload);
