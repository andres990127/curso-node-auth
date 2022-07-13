// Archivo de definición de estrategias de autenticación passportJs [https://www.passportjs.org/packages/]

// Se importa passport
const passport = require('passport');

// Importamos la estrategia local
const LocalStrategy = require('./strategies/local.strategy');

// Usamos la estrategia
passport.use(LocalStrategy);
