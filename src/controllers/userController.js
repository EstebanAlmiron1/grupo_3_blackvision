const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const Users = require('../../models/User')
let userList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8'))

const controller = {
    login: (req, res) => {
        res.render(path.join(__dirname, "../views/login.ejs"))
    },
    loginProcess: (req,res) => {
        let userToLogin = Users.findByField('email',req.body.mail)
        if (userToLogin){
            let passOk = bcrypt.compareSync(req.body.pass,userToLogin.password)
            if(passOk){
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if(req.body.remember){
                    res.cookie("userMail", req.body.mail, {maxAge : (1000*60)*10})
                }
                res.redirect('/user/profile/'+ userToLogin.id)
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
        res.render(path.join(__dirname, "../views/register.ejs"))
    },
    registerProcess: (req, res) => {
        let errors = validationResult(req)
        let userInDb = Users.findByField('email',req.body.emailus)
        if (userInDb) {
            return res.render(path.join(__dirname, "../views/register.ejs"),{
                errors:{email :{msg :'email ya registrado'}},
                old : req.body
            })            
        }
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
            res.redirect('/user/profile/'+newUser.id)
        }
        else res.render(path.join(__dirname, "../views/register.ejs"),{msgError: errors.array(), old: req.body})

    },
    cart: (req, res) => {
        res.render(path.join(__dirname, "../views/productCart.ejs"))
    },
    profile: (req, res) => {
        //let userFound = userList.find((i) => i.id == req.params.id);
        console.log(res.locals.isLogged);
        res.render(path.join(__dirname, "../views/profile.ejs"), { user: req.session.userLogged })
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
    },
    logout: (req,res)=>{
        res.clearCookie("userMail")
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = controller 