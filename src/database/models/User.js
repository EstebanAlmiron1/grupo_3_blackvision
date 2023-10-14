module.exports= function(sequelize,DataTypes){
    let alias = 'User'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        first_name:{
            type: DataTypes.STRING
        },
        last_name:{
            type: DataTypes.STRING
        },
        birthdate:{
            type: DataTypes.DATE
        },
        address:{
            type: DataTypes.STRING
        },
        img:{
            type: DataTypes.STRING(255)
        },
        id_roles:{
            type: DataTypes.INTEGER
        },
        mail:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING(255)
        },
        created_at:{
            type: DataTypes.DATE
        },
        deleted_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        } 

    }
    let config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let User = sequelize.define(alias,cols,config)
    User.associate = function (models) {
        User.belongsTo(models.Rol,{
           foreignKey :'id_roles',
           AS : 'roles'
        }),
    User.hasMany(models.Invoice,{
            foreignKey :'id_users',
            AS : 'facturas'
        })
    }
    return User
}
