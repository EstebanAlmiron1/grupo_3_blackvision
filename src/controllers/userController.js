const path=require('path')

const controller ={
    login:(req,res)=>{
        res.render(path.join(__dirname,"../views/login.ejs"))
    },
    register:(req,res)=>{
        res.render(path.join(__dirname,"../views/register.ejs"))
    },
    cart:(req,res)=>{
        res.render(path.join(__dirname,"../views/productCart.ejs"))
    },
    profile:(req,res)=>{
        res.render(path.join(__dirname,"../views/vistaPerfil.ejs"))
    }
}

module.exports = controller