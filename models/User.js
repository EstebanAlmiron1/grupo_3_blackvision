const fs = require('fs')
const User={
    filename:'./src/data/userData.JSON',
    getdata :function () {
        return JSON.parse(fs.readFileSync(this.filename,'utf-8'))    
    },
    findAll: function(){
        return this.getdata()
    },
    findByPk :function (id){
        let allUsers = this.findAll()
        let userFound = allUsers.find(i =>i.id == id)
        return userFound    
    },
    findByField :function (field,text) {
        let allUsers = this.findAll()
        let userFound = allUsers.find(i =>i[field] == text)
        return userFound
    },
    createUser :function (userData) {
        let allUsers = this.findAll()
        let newUser = {
            id : allUsers.length + 1,
            ...userData
        }
        allUsers.push(newUser)
        fs.writeFileSync(this.filename,JSON.stringify(allUsers, null ,' '))             //pasamos de objeto literal a formato json
        return newUser 
    },
    delete : function (id) {
        let allUsers = this.findAll()
        let finalUser = allUsers.filter(i =>i.id !== id)
        fs.writeFileSync(this.filename,JSON.stringify(finalUser, null ,' '))
    },
};

module.exports = User
