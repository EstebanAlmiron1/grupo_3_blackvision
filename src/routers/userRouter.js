const express =require('express')
const router =express.Router()
const controller =require('../controllers/userController')
// Middlewares
const validations = require('../middlewares/validations')
const validatorRegister = require('../middlewares/validatorRegister')
const uploadFile = require('../middlewares/multerUs')
const guestMiddelware = require('../middlewares/guestMiddelware')
const authtMiddelware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const validatorEditUser = require('../middlewares/validatorEditUser')

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
router.get("/list",authtMiddelware, adminMiddleware, controller.list)
router.get("/edit/:id",controller.edit)
router.put("/edit/:id",uploadFile.single('image'),validatorEditUser,controller.editProcess)
router.delete("/edit/:id",controller.deleteProcess)
router.post("/edit/:id",controller.undelteProcess)

module.exports=router