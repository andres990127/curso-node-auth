// Archivo para autenticación con passport

// Se importa express
const express = require('express');

// Se importa passport
const passport = require('passport');

// Se instancia router
const router = express.Router();

// Se autentica con passport el usuario y contraseña que se reciben
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

// Se exporta el modulo
module.exports = router;
