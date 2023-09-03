const path = require('path')
const fs = require('fs')
let userList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8'))

const controller ={
    login:(req,res)=>{
        res.render(path.join(__dirname,"../views/login.ejs"))
    },
    register:(req,res)=>{
        res.render(path.join(__dirname,"../views/register.ejs"))
    },
    registerProcess:(req,res)=>{
        let newUser = {
            "id": userList.length + 1,
            "name": req.body.nameus.toLowerCase(),
            "lastname": req.body.lastnameus.toLowerCase(),
            "birthday": req.body.birthday.toLowerCase(),
            "adress": req.body.adressus.toLowerCase(),
            "email": req.body.emailus.toLowerCase(),
            "password": req.body.passus,
            "img": req.file ? req.file.filename : 'defaultUs.png',
            "admin": false
        }
        userList.push(newUser)
        fs.writeFileSync(path.join(__dirname, '../data/userData.json'), JSON.stringify(userList, null, 2), 'utf-8')
        res.redirect('/')
    },
    cart:(req,res)=>{
        res.render(path.join(__dirname,"../views/productCart.ejs"))
    },
    profile:(req,res)=>{
        let userFound = userList.find((i) => i.id == req.params.id);
        res.render(path.join(__dirname,"../views/profile.ejs"), { user: userFound })
    },
    search: (req,res)=>{
        let busqueda = req.query.search.toLowerCase() ; 
        let resultadoBusqueda = []      
        for (let i = 0; i < listaProductos.length; i++) {
            if(listaProductos[i].nombre.includes(busqueda)){
                resultadoBusqueda.push(listaProductos[i])
            }
        };
        res.render('resultadobusqueda',{resultadoBusqueda:resultadoBusqueda, palabra: busqueda,})
       
    }
}

module.exports = controller