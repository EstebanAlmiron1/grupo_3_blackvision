module.exports= function(sequelize,DataTypes){
    let alias = 'categoria'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
        },
    }
    let config = {
        tableName: 'categoria',
        timestamps: false,
    }
    let Rol = sequelize.define(alias,cols,config)
    return Rol
}