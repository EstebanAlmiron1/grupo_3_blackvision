const {check} = require('express-validator')
const validatorRegister = [
    check('nameus').notEmpty().withMessage('El nombre es un campo obligatorio') ,
    check('lastnameus').notEmpty().withMessage('El apellido es un campo obligatorio') ,
    check('birthday').notEmpty().withMessage('La fecha es un campo obligatorio').bail().isDate().withMessage('Debe ingresar una fecha valida') ,
    check('adressus').notEmpty().withMessage('La direccion es un campo obligatorio') ,
    check('emailus').notEmpty().withMessage('El email es un campo obligatorio').bail().isEmail().withMessage('Debe ingresar un email valido') ,
    check('passus').notEmpty().withMessage('La password es un campo obligatorio').bail().isLength({min:8,max:20}).withMessage('la password debe tener minimo 8 caracteres') ,
    
]
module.exports = validatorRegister