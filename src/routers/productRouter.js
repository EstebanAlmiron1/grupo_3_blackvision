const express =require('express')
const router =express.Router()
const path =require('path')
const controller =require('../controllers/productController')
const multer =require('multer')


//configuracion de storage y nombre de las img que se suban 
const storage = multer.diskStorage({
    destination: function (req ,file,cb) {
        let folder = path.join(__dirname,'../../public/img/products')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imgName = Date.now()+ path.extname(file.originalname)
        cb(null,imgName)
    },
})
const uploadFile = multer({storage});

router.get("/",controller.list)
router.get("/detail",controller.detail)
router.get("/crear",controller.crear)
router.post("/crear",uploadFile.single('image'),controller.crearProcess)
router.get("/edit",controller.edit)
module.exports=router
