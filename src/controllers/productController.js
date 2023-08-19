const path=require('path')
const fs = require('fs')
let listaProductos = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/productData.json'),'utf-8'))

const controller ={
    list:(req,res)=>{
        res.render(path.join(__dirname,"../views/productList.ejs"))
    },
    detail:(req,res)=>{
        res.render(path.join(__dirname,"../views/productDetail.ejs"))
    },
    crear: (req,res) =>{
        res.render(path.join(__dirname,"../views/productCrear.ejs"))
    },
    crearProcess:(req,res) =>{
        let newProduct = {
            "id": listaProductos.length +1,
            "nombre": req.body.nombre,
            "descripcion": req.body.descripcion,
            "color": req.body.color,
            "talle": req.body.talle,
            "precio": req.body.precio,                        
            }
            listaProductos.push(newProduct)
            
            fs.writeFileSync(path.join(__dirname,'../data/productData.json'),JSON.stringify(listaProductos,null,2),'utf-8')
            res.redirect('/')
            
        },
        edit:(req,res)=>{
            res.render(path.join(__dirname,"../views/productEditar.ejs"))
        },
        editProcess:(req,res)=>{

            fs.writeFileSync(path.join(__dirname,'../data/productData.json'),JSON.stringify(listaProductos,null,2),'utf-8')
            res.redirect('/')

        }
    }





module.exports = controller