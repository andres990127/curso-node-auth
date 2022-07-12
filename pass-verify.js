// Archivo de prueba para demostración de verificacion de un hash en bcrypt

// Se importa bcrypt
const bcrypt = require('bcrypt');

// Se crea función para verificar un hash
async function verifyPassword(){

  // Se obtiene la contraseña a comparar con el hash
  const myPassword = 'admin123';

  // Se obtiene el hash a comparar con la contraseña
  const hash = '$2b$10$ruZIcJ/c2kLC9lxL1KN5/.wsf23v5F0YvfazmOwT1T5aUZVZkTvRi';

  // Se verifica que la contraseña y el hash correspondan a un valor igual
  const isMatch = await bcrypt.compare(myPassword, hash);

  // Se imprime la verificación
  console.log(isMatch);
};

// Se ejecuta la función
verifyPassword();

