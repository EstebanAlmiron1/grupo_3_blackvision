const {check} = require('express-validator')
const fs = require('fs')

const validations = [
    check('image').custom((value, {req})=>{
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

module.exports = validations