const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const db = require('../database/models')
const { CharsetToEncoding } = require('mysql2')

const controller = {
    login: (req, res) => {
        return res.render(path.join(__dirname, "../views/login.ejs"))
    },
    loginProcess: async (req,res) => { 
        let userToLogin = await db.User.findOne({where:{email: req.body.email}})
        if (userToLogin){
            let passOk = bcrypt.compareSync(req.body.pass,userToLogin.password)
            if(passOk){
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if(req.body.remember){
                    res.cookie("userMail", req.body.mail, {maxAge : (1000*60)*10})
                }
                return res.redirect('/user/profile/'+ userToLogin.id)
            }
            else 
            return res.render(path.join(__dirname, "../views/login.ejs"),{
                errors:{email :{msg :'email o contraseña inválida'}}
            })
        }
        return res.render(path.join(__dirname, "../views/login.ejs"),{
            errors:{email :{msg :'email no registrado'}}
        })
    },
    register: (req, res) => {
        return res.render(path.join(__dirname, "../views/register.ejs"))
    }, 
    registerProcess: async (req, res) => {
        let errors = validationResult(req)
        let userInDb = await db.User.findOne({where:{email: req.body.email}})
        if (userInDb) {
            return res.render(path.join(__dirname, "../views/register.ejs"),{
                errors:{email :{msg :'email ya registrado'}},
                old : req.body
            })            
        }
        if (errors.isEmpty()) {
            db.User.create({            
                "name": req.body.nameus.toLowerCase(),
                "lastname": req.body.lastnameus.toLowerCase(),
                "birthday": req.body.birthday.toLowerCase(),
                "adress": req.body.adressus.toLowerCase(),
                "email": req.body.emailus.toLowerCase(),
                "password": bcrypt.hashSync(req.body.passus,10),       
                "img": req.file ? req.file.filename : 'defaultUs.png',
                "admin": false,
                "deleted":false

            })
            return res.redirect('/user/profile/1')
        }
        else return res.render(path.join(__dirname, "../views/register.ejs"),{msgError: errors.array(), old: req.body})
    },
    cart: (req, res) => {
        return res.render(path.join(__dirname, "../views/productCart.ejs"))
    },
    profile: (req, res) => {
        //let userFound = userList.find((i) => i.id == req.params.id);
        //console.log(res.locals.isLogged);
        return res.render(path.join(__dirname, "../views/profile.ejs"), { user: req.session.userLogged })
    }, 
    /*search: (req, res) => {
        let busqueda = req.query.search.toLowerCase();
        let resultadoBusqueda = []
        for (let i = 0; i < listaProductos.length; i++) {
            if (listaProductos[i].nombre.includes(busqueda)) {
                resultadoBusqueda.push(listaProductos[i])
            }
        };
        return res.render('resultadobusqueda', { resultadoBusqueda: resultadoBusqueda, palabra: busqueda, })
    },*/ 
    list: async (req,res)=>{
        let userAvailable = await db.User.findAll()
        return res.render(path.join(__dirname, "../views/users.ejs"), { user: userAvailable })
    },
    logout: (req,res)=>{
        res.clearCookie("userMail")
        req.session.destroy()
        return res.redirect('/') 
    }
}

module.exports = controller 