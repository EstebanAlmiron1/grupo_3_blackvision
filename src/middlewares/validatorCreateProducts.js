const {check} = require('express-validator')
const validatorCreate = [
    check('name').notEmpty().withMessage('El nombre es un campo obligatorio').bail().isLength({min:5}).withMessage('El nombre debe tener minimo 5 caracteres') ,
    check('description').notEmpty().withMessage('La descripción es un campo obligatorio').bail().isLength({min:20}).withMessage('La descripcion debe tener minimo 20 caracteres') ,
    check('color').notEmpty().withMessage('El color debe ser obligatorio') ,
    check('size').notEmpty().withMessage('El talle es un campo obligatorio') ,
    check('category').notEmpty().withMessage('La categoria es obligatoria'),
    check('brand').notEmpty().withMessage('La marca del producto es obligatoria'),
    check('price').notEmpty().withMessage('El precio es un campo obligatorio'),
   
] 
module.exports = validatorCreate