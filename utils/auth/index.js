// Archivo de definición de estrategias de autenticación passportJs [https://www.passportjs.org/packages/]

// Se importa passport
const passport = require('passport');

// Importamos las estrategias creadas
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

// Usamos las estrategias importadas
passport.use(LocalStrategy);
passport.use(JwtStrategy);
