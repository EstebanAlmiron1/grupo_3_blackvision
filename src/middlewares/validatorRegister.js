const {check} = require('express-validator')
const validatorRegister = [
    check('nameus').notEmpty().withMessage('El nombre es un campo obligatorio') ,
    check('lastnameus').notEmpty().withMessage('El apellido es un campo obligatorio') ,
    check('birthday').notEmpty().withMessage('La fecha es un campo obligatorio').bail().custom((value,{req})=>{
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(req.body.birthday)) {
    throw new Error('Fecha inválida');
  }

  const [year, month, day] = req.body.birthday.split('-').map(Number);

  
  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error('Fecha inválida');
  }

  return true;
    }),
    check('adressus').notEmpty().withMessage('La direccion es un campo obligatorio') ,
    check('emailus').notEmpty().withMessage('El email es un campo obligatorio').bail().isEmail().withMessage('Debe ingresar un email valido') ,
    check('passus').notEmpty().withMessage('La password es un campo obligatorio').bail().isLength({min:8,max:20}).withMessage('la password debe tener minimo 8 caracteres') ,
    
]
module.exports = validatorRegister