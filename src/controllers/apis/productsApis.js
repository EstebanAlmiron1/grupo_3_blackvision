const db = require('../../database/models')

const controller = {
    list: async (req,res) => {
        let respuesta = {
            count: 0,
            countByCategory: {},
            products:[]
        }
        const [products,categories] = await Promise.all([db.Product.findAll({include:[{association:'categorias'}]}),db.Category.findAll({include:[{association:'productos'}]})])
       respuesta.count = products.length
       categories.forEach(categoria => {
        respuesta.countByCategory[categoria.name] = categoria.productos.length
       });
       respuesta.products = products.map(row =>{
        return{
            id: row.id,
            name: row.name,
            description: row.description,
            category: row.Category,
            detail: '/api/product/detail/'+row.id
        }
       })
       res.json(respuesta)
    },
    detail: async (req,res) => {
        const product = await db.Product.findByPk(req.params.id, { include: [{ association: "talles" }, { association: "colores" }, { association: "marcas" }, { association: "categorias" }] })
        
        let response = {
            id:product.id,
            name:product.name,
            description: product.description,
            price:product.price,
            brand:product.marcas,
            size: product.talles,
            color:product.colores,
            category: product.categorias,
            url_imagen:'/img/products/'+product.img,
            
        }
        
        
       res.json(response)


    }
}
module.exports = controller