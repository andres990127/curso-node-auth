// Archivo de configuración para carga de variables de entorno del archivo .env al sistema

// Se importa dotenv para poder cargar las variables de entorno
require('dotenv').config();

// Se asignan los valores de las variables globales a atributos que podrán ser llamados
const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD
}

// Se exporta el modulo
module.exports = { config };
