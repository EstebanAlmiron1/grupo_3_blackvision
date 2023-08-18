const express =require('express')
const router =express.Router()
const controller =require('../controllers/userController')

router.get("/login",controller.login)
router.get("/register",controller.register)
router.get("/cart",controller.cart)
router.get("/",controller.profile)
router.get("/userResults", controller.search)


module.exports=router