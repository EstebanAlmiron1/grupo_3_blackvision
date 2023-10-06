const path = require('path')
const fs = require('fs')
//let productsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8'))//
const db = require('../database/models')
const { validationResult } = require('express-validator')

const controller = {
    list: async (req, res) => {
        let productsAvaliable = await db.Product.findAll()
        return res.render(path.join(__dirname, "../views/productList.ejs"), { listP: productsAvaliable })
    },
    detail: async (req, res) => {
        let productFound =  db.Product.findByPk(req.params.id); 
        return res.render(path.join(__dirname, "../views/productDetail.ejs"), { product: productFound })
    },
    crear: (req, res) => {
        return res.render(path.join(__dirname, "../views/productCreate.ejs"))
    },
    crearProcess: async (req, res) => {
        let errors = validationResult(req)
        if (errors.errors.length > 0) { }
        let newProduct = await db.Product.create({
            "name": req.body.name.toLowerCase(),
            "description": req.body.description.toLowerCase(),
            "color": req.body.color.toLowerCase(),            
            "price": req.body.price,
            "img": req.file ? req.file.filename : 'logo.png',
        })
        
        return res.redirect('/')
    },
    edit: async (req, res) => {
        let productFound = await db.Product.findByPk(req.params.id);

        return res.render(path.join(__dirname, "../views/productEdit.ejs"), { product: productFound })
    },
    editProcess: async (req, res) => {
        
        db.Product.update({
            name: req.body.name,
            description:req.body.description,
            price:req.body.price,
            //img:req.body.img, lo de la imagen ver como funciona el tema de edicion creo qeu es productFound.img
            //id_brand: , no tenemos marca en el formulario, se debe aregar
            id_color: req.body.color, 
            id_size: req.body.size,
            //id_category: lo mismo que en brand, cuando lo agreguemos ya hacemos lo de crud tambien

        },{where:{id:req.params.id}})
        return res.redirect('/')
    },
    deleteProcess: (req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);
        productFound.deleted = true

        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), JSON.stringify(productsList, null, 2), 'utf-8')
        return res.redirect('/')
    },
    undelteProcess:(req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);
        productFound.deleted = false

        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), JSON.stringify(productsList, null, 2), 'utf-8')
        return res.redirect('/')
    }
}

module.exports = controller;