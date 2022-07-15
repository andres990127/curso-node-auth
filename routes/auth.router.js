// Archivo para autenticación con passport

// Se importa express
const express = require('express');

// Se importa passport
const passport = require('passport');

// Se importa el modulo de JWS
const jwt = require('jsonwebtoken');

// Se importa la configuración para obtener las variables de ambiente
const { config } = require('./../config/config');

// Se instancia router
const router = express.Router();

// Se autentica con passport el usuario y contraseña que se reciben
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

// Se exporta el modulo
module.exports = router;
