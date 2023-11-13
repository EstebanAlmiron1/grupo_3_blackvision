module.exports= function(sequelize,DataTypes){
    let alias = 'Rol'
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
        tableName: 'roles',
        timestamps: false,
    }
    let Rol = sequelize.define(alias,cols,config)
    Rol.associate = function (models) {
        Rol.hasMany(models.User,{
            foreignKey :'id_roles',
            as : 'usuarios'
        })
    }  
    return Rol
}