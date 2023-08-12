const path=require('path')

const controller ={
    login:(req,res)=>{
        res.render(path.join(__dirname,"../views/login.ejs"))
    },
    register:(req,res)=>{
        res.render(path.join(__dirname,"../views/register.ejs"))
    },
    perfil:(req,res)=>{
        res.render(path.join(__dirname,"../views/perfil.ejs"))
    },
    cart:(req,res)=>{
        res.render(path.join(__dirname,"../views/productCart.ejs"))
    }
}

module.exports = controller