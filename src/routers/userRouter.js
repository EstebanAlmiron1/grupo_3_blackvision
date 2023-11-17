const express =require('express')
const router =express.Router()
const validations = require('../middlewares/validations')
const validatorRegister = require('../middlewares/validatorRegister')
const uploadFile = require('../middlewares/multerUs')
const controller =require('../controllers/userController')
const guestMiddelware = require('../middlewares/guestMiddelware')
const authtMiddelware = require('../middlewares/authMiddleware')

//register
router.get("/register",guestMiddelware,controller.register)
router.post("/register",uploadFile.single('imageus'),validatorRegister,controller.registerProcess)
//login
router.get("/login",guestMiddelware,controller.login)
router.post("/login",controller.loginProcess)
router.get("/logout",controller.logout)
//perfil
router.get("/profile/:id",authtMiddelware,controller.profile)
router.get("/cart",controller.cart)
//otros
router.get("/userResults", controller.search)
router.get("/list", controller.list)

module.exports=router