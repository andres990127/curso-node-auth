// Archivo para autenticación con passport

// Se importa express
const express = require('express');

// Se importa passport
const passport = require('passport');

// Se instancia router
const router = express.Router();

// Importamos los servicios relacionados con ordenes de compra
const OrderService = require('../services/order.service');

// Instanciamos el servicio
const service = new OrderService();

// Se autentica con passport el usuario y contraseña que se reciben
router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

// Se exporta el modulo
module.exports = router;
