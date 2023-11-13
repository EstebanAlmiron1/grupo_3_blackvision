module.exports= function(sequelize,DataTypes){
    let alias = 'Brand'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
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
        tableName: 'brands',
        timestamps: false,
        paranoid: true,
        deletedAt: "deleted_at", 
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Brand = sequelize.define(alias,cols,config)
    Brand.associate = function (models) {
        Brand.hasMany(models.Product,{
           foreignKey :'id_brand',
           as : 'productos'
        })
    }
    return Brand
}
