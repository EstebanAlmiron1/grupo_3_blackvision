const path = require('path')
const fs = require('fs')
let productsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8'))
const { validationResult } = require('express-validator')

const controller = {
    list: (req, res) => {
        let productsAvaliable = productsList.filter((i)=> i.deleted == false)
        res.render(path.join(__dirname, "../views/productList.ejs"), { listP: productsAvaliable })
    },
    detail: (req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);
        res.render(path.join(__dirname, "../views/productDetail.ejs"), { product: productFound })
    },
    crear: (req, res) => {
        res.render(path.join(__dirname, "../views/productCreate.ejs"))
    },
    crearProcess: (req, res) => {
        let errors = validationResult(req)
        if (errors.errors.length > 0) { }
        let newProduct = {
            "id": productsList.length + 1,
            "nombre": req.body.name.toLowerCase(),
            "descripcion": req.body.description.toLowerCase(),
            "color": req.body.color.toLowerCase(),
            "talle": req.body.size.toLowerCase(),
            "precio": req.body.price,
            "img": req.file ? req.file.filename : 'logo.png',
            "deleted": false
        }
        productsList.push(newProduct)

        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), JSON.stringify(productsList, null, 2), 'utf-8')
        res.redirect('/')
    },
    edit: (req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);

        res.render(path.join(__dirname, "../views/productEdit.ejs"), { product: productFound })
    },
    editProcess: (req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);
        productFound.nombre = req.body.name
        productFound.descripcion = req.body.description
        productFound.color = req.body.color
        productFound.talle = req.body.size
        productFound.precio = req.body.price
        productFound.img = req.file ? req.file.filename : productFound.img

        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), JSON.stringify(productsList, null, 2), 'utf-8')
        res.redirect('/')
    },
    deleteProcess: (req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);
        productFound.deleted = true

        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), JSON.stringify(productsList, null, 2), 'utf-8')
        res.redirect('/')
    },
    undelteProcess:(req, res) => {
        let productFound = productsList.find((i) => i.id == req.params.id);
        productFound.deleted = false

        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), JSON.stringify(productsList, null, 2), 'utf-8')
        res.redirect('/')
    }
}

module.exports = controller;