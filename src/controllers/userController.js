const path=require('path')
const fs = require('fs')
const { log } = require('console')
let listaProductos = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/productData.json'),'utf-8'))

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
        res.render(path.join(__dirname,"../views/profile.ejs"))
    },
    search: (req,res)=>{
        let busqueda = req.query.search ; 
        let resultadoBusqueda = []      
        for (let i = 0; i < listaProductos.length; i++) {
            if(listaProductos[i].nombre.includes(busqueda)){
                resultadoBusqueda.push(listaProductos[i])
            }
        };
        res.render('resultadobusqueda',{resultadoBusqueda:resultadoBusqueda})
       
    }
}

module.exports = controller