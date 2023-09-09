const {check} = require('express-validator')
const validatorRegister = [
    check('nameus').notEmpty().withMessage('Es obligatorio ingresar un nombre valido') ,
    check('lastnameus').notEmpty().withMessage('Es obligatorio ingresar un apellido valido') ,
    check('birthday').notEmpty().isDate().withMessage('Es obligatorio ingresar una fecha valida') ,
    check('adressus').notEmpty().withMessage('Es obligatorio ingresar una dirección valida') ,
    check('emailus').notEmpty().isEmail.withMessage('Es obligatorio ingresar un email valido') ,
    check('passus').notEmpty().isLength({min:8,max:20}).withMessage('la password debe tener minimo 8 caracteres') ,
    check('imageus').custom((value, {req})=>{
        let file = req.file;
        if(req.fileError){
            throw new Error ('adjunte una imagen con formato valido')
        }
        else if (file.size > 1024*1024*10){
            fs.unlinkSync(file.path)
            throw new Error ('la imagen debe pesar menos de 10Mb')
        }
        return true
    })
]
module.exports = validatorRegister