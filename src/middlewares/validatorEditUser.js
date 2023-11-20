const {check} = require('express-validator')
const validatorEditUser = [
    check('nameus').notEmpty().withMessage('*El nombre es un campo obligatorio') ,
    check('lastnameus').notEmpty().withMessage('*El apellido es un campo obligatorio') ,
    check('birthday').notEmpty().withMessage('*La fecha es un campo obligatorio').bail().custom((value,{req})=>{
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(req.body.birthday)) {
    throw new Error('*Fecha inválida');
  }

  const [year, month, day] = req.body.birthday.split('-').map(Number);

  
  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error('*Fecha inválida');
  }

  return true;
    }),
    check('adressus').notEmpty().withMessage('*El domicilio es un campo obligatorio') ,
    check('emailus').notEmpty().withMessage('*El email es un campo obligatorio').bail().isEmail().withMessage('*Email con formato invalido') ,
    
  ]
module.exports = validatorEditUser