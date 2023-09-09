const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
let userList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8'))

const controller = {
    login: (req, res) => {
        res.render(path.join(__dirname, "../views/login.ejs"))
    },
    register: (req, res) => {
        res.render(path.join(__dirname, "../views/register.ejs"))
    },
    registerProcess: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let newUser = {
                "id": userList.length + 1,
                "name": req.body.nameus.toLowerCase(),
                "lastname": req.body.lastnameus.toLowerCase(),
                "birthday": req.body.birthday.toLowerCase(),
                "adress": req.body.adressus.toLowerCase(),
                "email": req.body.emailus.toLowerCase(),
                "password": bcrypt.hashSync(req.body.passus,10),
                "img": req.file ? req.file.filename : 'defaultUs.png',
                "admin": false,
            "deleted":false
            }
            userList.push(newUser)
            fs.writeFileSync(path.join(__dirname, '../data/userData.json'), JSON.stringify(userList, null, 2), 'utf-8')
            res.redirect('/')
        }
        else res.render(path.join(__dirname, "../views/register.ejs"),{msgError: errors.array(), old: req.body})

    },
    cart: (req, res) => {
        res.render(path.join(__dirname, "../views/productCart.ejs"))
    },
    profile: (req, res) => {
        let userFound = userList.find((i) => i.id == req.params.id);
        res.render(path.join(__dirname, "../views/profile.ejs"), { user: userFound })
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase();
        let resultadoBusqueda = []
        for (let i = 0; i < listaProductos.length; i++) {
            if (listaProductos[i].nombre.includes(busqueda)) {
                resultadoBusqueda.push(listaProductos[i])
            }
        };
        res.render('resultadobusqueda', { resultadoBusqueda: resultadoBusqueda, palabra: busqueda, })

    },
    list: (req,res)=>{
        let userAvailable = userList.filter((i)=> i.deleted == false)
        res.render(path.join(__dirname, "../views/users.ejs"), { user: userAvailable })
    }
}

module.exports = controller