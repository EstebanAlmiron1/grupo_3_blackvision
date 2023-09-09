const express =require('express')
const router =express.Router()
const validations = require('../middlewares/validations')
const validatorRegister = require('../middlewares/validatorRegister')
const uploadFile = require('../middlewares/multerUs')
const controller =require('../controllers/userController')


router.get("/login",controller.login)
router.get("/register",controller.register)
router.post("/register",uploadFile.single('imageus'),validatorRegister,controller.registerProcess)
router.get("/cart",controller.cart)
router.get("/:id",controller.profile)
router.get("/userResults", controller.search)
router.get("/:id",controller.profile)



module.exports=router