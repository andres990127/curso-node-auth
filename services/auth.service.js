// Importamos la clase de usuario para usar sus consultas
const UserService = require('./user.service');

// Se importa el modulo de envio de correos
const nodemailer = require("nodemailer");

// Se importa el modulo de JWS
const jwt = require('jsonwebtoken');

// Se importa el gestor de errores
const boom = require('@hapi/boom');

// Se importa bcrypt para desencriptar hashes
const bcrypt = require('bcrypt');

// Se importa la configuración para obtener las variables de ambiente
const { config } = require('./../config/config');

// Instanciamos una clase de servicio
const service = new UserService();

// Servicios de autenticación
class AuthService {

  // Servicio de login para validar si el usuario y contraseña ingresados coinciden con alguno de la base de datos
  async getUser(email, password) {

    // Se obtiene el usuario que tiene el correo que se envia
    const user = await service.findByEmail(email);

    // Si no existe usuario con ese correo enviado se devuelve un error de no autorización
    if (!user) {
      throw boom.unauthorized();
    }

    // Si existe usuario entonces se verifica que la contraseña y el hash correspondan a un valor igual
    const isMatch = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide con la del usuario entonces se devuelve un error de no autorización
    if (!isMatch) {
      throw boom.unauthorized();
    }

    // Se elimina el dato de password en la información de retorno al usuario
    delete user.dataValues.password;

    // Se retorna el usuario encontrado
    return user;
  }

  // Servicio para firmar un JWT con un usuario especifico
  signToken(user){

    // Se declara un payload el cual debe tener un sub obligatoriamente y cualquier otros campos
    const payload = {
      sub: user.id,
      role: user.role,
    };

    // Se firma el token enviandole el payload y una clave secreta solo conocida por el backend
    const token = jwt.sign(payload, config.jwtSecret);

    // Se devuelve el usuario y el token creado
    return {
      user,
      token
    };
  }

  async sendRecovery(email){
    // Se obtiene el usuario que tiene el correo que se envia
    const user = await service.findByEmail(email);

    // Si no existe usuario con ese correo enviado se devuelve un error de no autorización
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id,
    }

    // Se firma el token enviandole el payload y una clave secreta solo conocida por el backend
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});

    const link = `http://myfronend.com/recovery?token=${token}`;

    await service.update(user.id, {recoveryToken: token});

    const mail = {
      from: config.remitentEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
      html: `<b>Ingresa a este link para recuperar la contraseña => ${link} </b>`, // html body
    }

    const rta = await this.sendMail(mail);

    return rta;

  }

  // Servicio para cambio de contraseña de un usuario
  async changePassword(token, newPassword){
    try{
      const payload = jwt.verify(token, config.jwtSecret);

      const user = await service.findOne(payload.sub);

      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await service.update(user.id, {recoveryToken: null, password: hash});

      return { message: "password changed"};

    }catch{
      throw boom.unauthorized();
    }
  }

  // Servicio para envio de correos hacia el correo recibido como parámetro
  async sendMail(infoMail) {

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail(infoMail);

    return { message: 'Mail sent'};
  }

}


module.exports = AuthService;
