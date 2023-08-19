const express =require('express')
const router =express.Router()
const controller =require('../controllers/productController')

router.get("/",controller.list)
router.get("/detail",controller.detail)
router.get("/crear",controller.crear)
router.post("/crear",controller.crearProcess)
router.get("/edit",controller.edit)
module.exports=router