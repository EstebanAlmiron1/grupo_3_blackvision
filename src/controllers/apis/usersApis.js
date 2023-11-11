const db = require('../../database/models')

const controller = {
    list: async (req,res) => {
        let respuesta = {
            count: 0,
            users:[]
        }
        let users = await db.User.findAll()
        respuesta.count = users.length
        respuesta.users = users.map(row =>{
            return {
                id: row.id,
                name: row.first_name + ' ' + row.last_name,
                email: row.mail,
                detail: '/api/user/detail/'+row.id     
               }
        })
        res.json(respuesta)
    },
    detail: async (req,res) => {
        let user = await db.User.findByPk(req.params.id,{attributes:{exclude:['id_roles','password']}});
        let respuesta = {
            ...user,
            url_imagen:'/img/users/'+user.img,

        }

        res.json(respuesta)
    }
    


}
module.exports = controller