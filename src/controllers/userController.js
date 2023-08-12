const path=require('path')

const controller ={
    login:(req,res)=>{
        res.sendFile(path.join(__dirname,"../views/login.html"))
    },
    register:(req,res)=>{
        res.sendFile(path.join(__dirname,"../views/register.html"))
    },
    perfil:(req,res)=>{
        res.sendFile(path.join(__dirname,"../views/perfil.html"))
    },
    cart:(req,res)=>{
        res.sendFile(path.join(__dirname,"../views/productCart.html"))
    }
}

module.exports = controller