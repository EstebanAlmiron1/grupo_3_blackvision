const express =require('express')
const router =express.Router()
const controller =require('../controllers/userController')
// Middlewares
const validations = require('../middlewares/validations')
const validatorRegister = require('../middlewares/validatorRegister')
const uploadFile = require('../middlewares/multerUs')
const guestMiddelware = require('../middlewares/guestMiddelware')
const authMiddleware = require('../middlewares/authMiddleware')
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
router.get("/profile/:id",authMiddleware,controller.profile)
router.get("/cart",authMiddleware,controller.cart)
//otros
router.get("/userResults", controller.search)
router.get("/edit/:id",authMiddleware,controller.edit)
router.put("/edit/:id",uploadFile.single('imageus'),validatorEditUser,controller.editProcess)
router.delete("/edit/:id",controller.deleteProcess)
router.post("/edit/:id",controller.undelteProcess)
//admin Edit
router.get("/list",authMiddleware, adminMiddleware, controller.list)
router.get("/adminedit/:id",authMiddleware, adminMiddleware,controller.adminUserEdit)
router.put("/adminedit/:id",uploadFile.single('imageus'),validatorEditUser,controller.adminUserEditProcess)

module.exports=router