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
        let userToLogin = await db.User.findOne({where:{mail: req.body.mail}})
        if (userToLogin){
            let passOk = bcrypt.compareSync(req.body.pass,userToLogin.password)
            if(passOk){
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if(req.body.remember){
                    res.cookie("userMail", req.body.mail, {maxAge : (4000*60)*10})
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
        let userInDb = await db.User.findOne({where:{mail: req.body.emailus}})
        if (userInDb) {
            return res.render(path.join(__dirname, "../views/register.ejs"),{
                errors:{email :{msg :'email ya registrado'}},
                old : req.body
            })            
        }
        if (errors.isEmpty()) {
            db.User.create({            
                "first_name": req.body.nameus.toLowerCase(),
                "last_name": req.body.lastnameus.toLowerCase(),
                "birthdate": req.body.birthday.toLowerCase(),
                "address": req.body.adressus.toLowerCase(),
                "mail": req.body.emailus.toLowerCase(),
                "password": bcrypt.hashSync(req.body.passus,10),       
                "img": req.file ? req.file.filename : 'defaultUs.png',
                "id_roles": 1
            })
            return res.redirect('/user/profile/1')
        }
        else return res.render(path.join(__dirname, "../views/register.ejs"),{msgError: errors.array(), old: req.body})
    },
    cart: (req, res) => {
        return res.render(path.join(__dirname, "../views/productCart.ejs"))//tarea fiamma
    },
    profile: async (req, res) => {
        let userFind = await db.User.findByPk(req.params.id);
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