const db = require('../database/models')
const controller = {
    home: async (req, res) => {
        let lastProducts = await db.Product.findAll({
            order:[['created_at','ASC']],
            limit:5
        })
        return res.render("index",{nuevos:lastProducts})
    }
}






module.exports = controller