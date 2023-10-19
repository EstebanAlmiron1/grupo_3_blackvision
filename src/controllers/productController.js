const path = require('path')
const fs = require('fs')
//let productsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8'))//
const db = require('../database/models')
const { validationResult } = require('express-validator')

const controller = {
    list: async (req, res) => {
        let userAdmin = req.session.userLogged.id_roles ? req.session.userLogged.id_roles : 'te deslogueaste'
        console.log('si es igual a 1, entonces es admin = ' + userAdmin );
        let productsAvaliable = await db.Product.findAll(/*{  preguntar al profe como hacer lo de paranoid false
            if (userAdmin == 1) {
                paranoid : false
            }
        }*/)
        

        return res.render(path.join(__dirname, "../views/productList.ejs"), { listP: productsAvaliable })
    },
    detail: async (req, res) => {
        let productFound = await db.Product.findByPk(req.params.id,{include:[{association:"Size"},{association:"Color"},{association:"Brand"},{association:"Category"}]});
        console.log("producto del detalle" + productFound.Size.size); 
        return res.render(path.join(__dirname, "../views/productDetail.ejs"), { product: productFound })
    },
    crear: async (req, res) => {
        let size = await db.Size.findAll();
        let category = await db.Category.findAll();
        let color = await db.Color.findAll();
        let brand = await db.Brand.findAll();
        return res.render(path.join(__dirname, "../views/productCreate.ejs"),{size:size,category:category,color:color,brand:brand})
    },
    crearProcess: (req, res) => {
        let errors = validationResult(req)
        if (errors.errors.length > 0) {console.log(errors)}
        let newProduct = db.Product.create({
            "name": req.body.name.toLowerCase(),
            "description": req.body.description.toLowerCase(),
            "id_color": req.body.color,            
            "price": req.body.price,
            "img": req.file ? req.file.filename : 'logo.png',
            "id_brand":req.body.brand,
            "id_size":req.body.size,
            "id_category":req.body.category            
        })
        
        
        
        return res.redirect('/')
    },
    edit: async (req, res) => {
        let productFound = await db.Product.findByPk(req.params.id);
        let size = await db.Size.findAll();
        let category = await db.Category.findAll();
        let color = await db.Color.findAll();
        let brand = await db.Brand.findAll();      
        return res.render(path.join(__dirname, "../views/productEdit.ejs"),{size:size,category:category,color:color,brand:brand,product: productFound})
    },
    editProcess: async (req, res) => {
        
        let productFound = await db.Product.findByPk(req.params.id);
        console.log(productFound.img)
        db.Product.update({
            name: req.body.name,
            description:req.body.description,
            price:req.body.price,
            img: req.file ? req.file.filename : productFound.img ,
            id_brand:req.body.brand,
            id_color: req.body.color, 
            id_size: req.body.size,
            id_category: req.body.category
            
        },{where:{id:req.params.id}})
        return res.redirect('/products/detail/'+ req.params.id)
    },
    deleteProcess: (req, res) => {
        db.Product.destroy({where:{id:req.params.id}})
        return res.redirect('/')
    },
    undelteProcess:(req, res) => {
        db.Product.restore({where:{id:req.params.id}})
        return res.redirect('/')
    }
}

module.exports = controller;