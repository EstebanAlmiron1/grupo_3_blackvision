
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const db = require('../database/models')


const controller = {
    login: (req, res) => {
        return res.render("login")
    },
    loginProcess: async (req, res) => {
        let userToLogin = await db.User.findOne({ where: { mail: req.body.mail } })
        if (userToLogin) {
            let passOk = bcrypt.compareSync(req.body.pass, userToLogin.password)
            if (passOk) {
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if (req.body.remember) {
                    res.cookie("userMail", req.body.mail, { maxAge: (4000 * 60) * 10 })
                }
                return res.redirect('/user/profile/' + userToLogin.id)
            }
            else
                return res.render("login", {
                    errors: { email: { msg: 'email o contraseña inválida' } }
                })
        }
        return res.render("login", {
            errors: { email: { msg: 'email no registrado' } }
        })
    },
    register: (req, res) => {
        return res.render("register")
    },
    registerProcess: async (req, res) => {
        let errors = validationResult(req)
        let userInDb = await db.User.findOne({ where: { mail: req.body.emailus } })
        if (userInDb) {
            return res.render("register", {
                errors: { email: { msg: 'email ya registrado' } },
                old: req.body
            })
        }
        if (errors.isEmpty()) {
            db.User.create({
                "first_name": req.body.nameus.toLowerCase(),
                "last_name": req.body.lastnameus.toLowerCase(),
                "birthdate": req.body.birthday.toLowerCase(),
                "address": req.body.adressus.toLowerCase(),
                "mail": req.body.emailus.toLowerCase(),
                "password": bcrypt.hashSync(req.body.passus, 10),
                "img": req.file ? req.file.filename : 'defaultUs.png',
                "id_roles": 2
            })
            return res.redirect('/user/profile/1')
        }
        else return res.render("register", { msgError: errors.array(), old: req.body })
    },
    cart: (req, res) => {
        return res.render("productCart")//tarea fiamma
    },
    profile: async (req, res) => {
        let userFind = await db.User.findByPk(req.params.id);

        return res.render("profile", { user: userFind })
    },
    search: async (req, res) => {
        let busqueda = req.query.search;
        let searchResult = await db.Product.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { name: { [db.Sequelize.Op.like]: '%' + busqueda + '%' } },
                    { description: { [db.Sequelize.Op.like]: '%' + busqueda + '%' } }

                ]
            }
        })
        console.log(searchResult);
        return res.render('resultadobusqueda', { resultadoBusqueda: searchResult, palabra: busqueda, })
    },
    list: async (req, res) => {
        let userAvailable = await db.User.findAll()
        return res.render("users", { user: userAvailable })
    },
    logout: (req, res) => {
        res.clearCookie("userMail")
        req.session.destroy()
        return res.redirect('/')
    },
    edit: async (req, res) => {
        let userFound = await db.User.findByPk(req.params.id)
        
        return res.render('userEdit',{user:userFound})
    },
    editProcess: async (req, res) => {
        let userFound = await db.User.findByPk(req.params.id)
        let errors = validationResult(req)

        if (errors.isEmpty()) {db.User.update({
            first_name: req.body.nameus,
            last_name: req.body.lastnameus,
            birthdate: req.body.birthday,
            address: req.body.adressus,
            img: req.file ? req.file.filename : userFound.img,
            mail: req.body.emailus,
            password: req.body.passus? bcrypt.hashSync(req.body.passus, 10):userFound.password,            

        }, { where: { id: req.params.id } })
        return res.redirect('/user/profile/'+ userFound.id)
        }else return res.render("userEdit", { msgError: errors.array(), user:userFound })
        
        
        
    },
    deleteProcess: (req, res) => {
        db.Product.destroy({ where: { id: req.params.id } })
        return res.redirect('/')
    },
    undelteProcess: (req, res) => {
        db.Product.restore({ where: { id: req.params.id } })
        return res.redirect('/')
    }
}

module.exports = controller 