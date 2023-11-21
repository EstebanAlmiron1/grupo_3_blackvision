const express =require('express')
const router =express.Router()
const validations = require('../middlewares/validations')
const controller =require('../controllers/productController')
const uploadFile = require('../middlewares/multer')
const validatorCreateProducts =require('../middlewares/validatorCreateProducts')


router.get("/",controller.list)
router.get("/detail/:id",controller.detail)
router.get("/create",controller.crear)
router.post("/create",uploadFile.single('image'),validations,validatorCreateProducts,controller.crearProcess)
router.get("/edit/:id",controller.edit)
router.put("/edit/:id",uploadFile.single('image'),validatorCreateProducts,controller.editProcess)
router.delete("/edit/:id",controller.deleteProcess)
router.post("/edit/:id",controller.undelteProcess) 



module.exports = router;