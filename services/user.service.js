// Archivo de servicios para "Usuarios"

// Se importa el gestor de errores
const boom = require('@hapi/boom');

// Se importa bcrypt
const bcrypt = require('bcrypt');

// Se importan los modelos para hacer CRUD
const { models } = require('./../libs/sequelize');

// Se crea una clase de Usuario con funciones para hacer CRUD
class UserService {
  constructor() {}

  // Función para creación de usuario
  async create(data) {

    // Se crea un hash de la contraseña y se hacen 10 saltos (Se encripta 10 veces)
    const hash = await bcrypt.hash(data.password, 10);

    // Se crea el usuario pero se clona el objeto de "data" entrante y se edita la contraseña por una encriptada
    const newUser = await models.User.create({
      ...data,
      password: hash
    });

    // Se elimina el atributo "password" por seguridad en lo que se le muestra al usuario luego de la creación
    delete newUser.dataValues.password;

    // Se retorna los datos devueltos por la creación
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
