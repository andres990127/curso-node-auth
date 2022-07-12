// Archivo de servicios para "Clientes"

// Se importa el gestor de errores
const boom = require('@hapi/boom');

// Se importa bcrypt
const bcrypt = require('bcrypt');

// Se importan los modelos para hacer CRUD
const { models } = require('./../libs/sequelize');

// Se crea una clase de Cliente con funciones para hacer CRUD
class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  // Función para creación de un cliente
  async create(data) {

    // Se crea un hash de la contraseña y se hacen 10 saltos (Se encripta 10 veces)
    const hash = await bcrypt.hash(data.user.password, 10);

    // Se crea un clon de la data entrante y tambien se le crea un clon al objeto hijo que posee
    // después al hijo se le edita el campo "password" a la contraseña encriptada
    const NewData = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    };

    // Se crea el nuevo cliente con la información anteriormente clonada
    const newCustomer = await models.Customer.create(NewData, {
      include: ['user']
    });

    // Se elimina el atributo "password" por seguridad en lo que se le muestra al cliente luego de la creación
    delete newCustomer.dataValues.user.dataValues.password;

    // Se retorna la información resultante de la creación del cliente
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
