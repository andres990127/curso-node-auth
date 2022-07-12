// Archivo de prueba para demostración de encriptado de bcrypt

// Se importa bcrypt
const bcrypt = require('bcrypt');

// Se crea función para encriptar password
async function hashPassword(){

  // Se asigna una contraseña de ejemplo a encriptar
  const myPassword = 'admin123';

  // Se crea un hash de esa contraseña y se hacen 10 saltos (Se encripta 10 veces)
  const hash = await bcrypt.hash(myPassword, 10);

  // Se imprime el hash de la contraseña ya encriptada
  console.log(hash);
};

// Se ejecuta la función
hashPassword();

