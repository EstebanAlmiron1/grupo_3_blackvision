const multer =require('multer')
const path =require('path')

//configuracion de storage y nombre de las img que se suban 
const storage = multer.diskStorage({
    destination: function (req ,file,cb) {
        let folder = path.join(__dirname,'../../public/img/users')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imgName = Date.now()+ path.extname(file.originalname)
        cb(null,imgName)
    },
})
const fileFilter = (req,file, cb)=>{
    if(file.mimetype.includes('image')){
        cb(null, true) 
    }
    else {
        req.fileError = true;
        cb(null,false)
    }
}
const uploadFile = multer({fileFilter,storage});

module.exports = uploadFile