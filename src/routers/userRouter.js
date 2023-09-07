const express =require('express')
const router =express.Router()
const validations = require('../middlewares/validations')
const uploadFile = require('../middlewares/multerUs')
const controller =require('../controllers/userController')


router.get("/login",controller.login)
router.get("/register",controller.register)
router.post("/register",uploadFile.single('imageus'),controller.registerProcess)
router.get("/cart",controller.cart)
router.get("/userResults", controller.search)
router.get("/list", controller.list)
router.get("/:id",controller.profile)

module.exports=router