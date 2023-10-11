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
        User.hasMany(models.Rol,{
           foreignKey :'id_roles',
           AS : 'roles'
        })
    }
    return User
}
