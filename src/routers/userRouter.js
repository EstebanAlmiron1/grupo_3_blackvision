const express =require('express')
const router =express.Router()
const controller =require('../controllers/userController')

router.get("/",controller.perfil)
router.get("/login",controller.login)
router.get("/register",controller.register)
router.get("/cart",controller.cart)


module.exports=router