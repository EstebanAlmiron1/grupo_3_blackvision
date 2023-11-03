const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const { validationResult } = require('express-validator')
const nodemon = require('nodemon')

const controller = {
    list: async (req, res) => {
        if (req.session.userLogged) {
            if (req.session.userLogged.id_roles == 1) {
                let productsAvaliable = await db.Product.findAll({ paranoid: false })
                return res.render("productList", { listP: productsAvaliable })
            } else {
                let productsAvaliable = await db.Product.findAll()
                return res.render("productList", { listP: productsAvaliable })
            }
        } else {
            let productsAvaliable = await db.Product.findAll()
            return res.render("productList", { listP: productsAvaliable })

        }
    },
    detail: async (req, res) => {
        if (req.session.userLogged) {
            if (req.session.userLogged.id_roles == 1) {
                let productFound = await db.Product.findByPk(req.params.id, { include: [{ association: "Size" }, { association: "Color" }, { association: "Brand" }, { association: "Category" }], paranoid: false });
                return res.render("productDetail", { product: productFound })
            } else {
                let productFound = await db.Product.findByPk(req.params.id, { include: [{ association: "Size" }, { association: "Color" }, { association: "Brand" }, { association: "Category" }] });
                return res.render("productDetail", { product: productFound })
            }
        } else {
            let productFound = await db.Product.findByPk(req.params.id, { include: [{ association: "Size" }, { association: "Color" }, { association: "Brand" }, { association: "Category" }] });
            return res.render("productDetail", { product: productFound })

        }
    },
    crear: async (req, res) => {
        let size = await db.Size.findAll();
        let category = await db.Category.findAll();
        let color = await db.Color.findAll();
        let brand = await db.Brand.findAll();
        return res.render("productCreate", { size: size, category: category, color: color, brand: brand })
    },
    crearProcess: async (req, res) => {
        let size = await db.Size.findAll();
        let category = await db.Category.findAll();
        let color = await db.Color.findAll();
        let brand = await db.Brand.findAll();
        let old = JSON.parse(JSON.stringify(req.body))

        let errors = validationResult(req)       
        if (errors.isEmpty()) { 
            let newProduct = db.Product.create({
                "name": req.body.name.toLowerCase(),
                "description": req.body.description.toLowerCase(),
                "id_color": req.body.color,
                "price": req.body.price,
                "img": req.file ? req.file.filename : 'logo.png',
                "id_brand": req.body.brand,
                "id_size": req.body.size,
                "id_category": req.body.category                
            })            
            return res.redirect('/')
        }else {res.render("productCreate",{errores:errors.array(),old:req.body,size: size, category: category, color: color, brand: brand}) }
       
       


        
    },
    edit: async (req, res) => {
        let size = await db.Size.findAll();
        let category = await db.Category.findAll();
        let color = await db.Color.findAll();
        let brand = await db.Brand.findAll();
        //
        if (req.session.userLogged) {
            if (req.session.userLogged.id_roles == 1) {
                let productFound = await db.Product.findByPk(req.params.id, { paranoid: false });
                return res.render("productEdit", { size: size, category: category, color: color, brand: brand, product: productFound })
            } else {
                let productFound = await db.Product.findByPk(req.params.id);
                return res.render("productEdit", { size: size, category: category, color: color, brand: brand, product: productFound })
            }
        } else {
            let productFound = await db.Product.findByPk(req.params.id);
            return res.render("productEdit", { size: size, category: category, color: color, brand: brand, product: productFound })

        }

    },
    editProcess: async (req, res) => {

        let productFound = await db.Product.findByPk(req.params.id);
        console.log(productFound.img)
        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: req.file ? req.file.filename : productFound.img,
            id_brand: req.body.brand,
            id_color: req.body.color,
            id_size: req.body.size,
            id_category: req.body.category

        }, { where: { id: req.params.id } })
        return res.redirect('/products/detail/' + req.params.id)
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

module.exports = controller;