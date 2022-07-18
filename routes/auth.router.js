// Archivo para autenticación con passport

// Se importa express
const express = require('express');

// Se importa passport
const passport = require('passport');

// Se instancia router
const router = express.Router();

// Importamos el servicio de autenticación
const AuthService = require('./../services/auth.service');

// Instanciamos una clase de servicio
const service = new AuthService();

// Se autentica con passport el usuario y contraseña que se reciben
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));

    } catch (error) {
      next(error);
    }
  }
);

// Recuperación de contraseña
router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Se exporta el modulo
module.exports = router;
