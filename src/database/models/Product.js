module.exports= function(sequelize,DataTypes){
    let alias = 'Product'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.DECIMAL
        },
        img:{
            type: DataTypes.INTEGER
        },
        id_brand:{
            type: DataTypes.INTEGER
        },
        id_color:{
            type: DataTypes.INTEGER
        },
        id_size:{
            type: DataTypes.INTEGER
        },
        id_category:{
            type: DataTypes.INTEGER
        }

    }
    let config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Product = sequelize.define(alias,cols,config)
    Product.associate = function (models) {
        Product.belongsTo(models.Color,{
           foreignKey :'id_color',
           AS : 'colores'
        }),
        Product.belongsTo(models.Brand,{
            foreignKey :'id_brand',
            AS : 'marcas'
        }),
        Product.belongsTo(models.Size,{
            foreignKey :'id_size',
            AS : 'talles'
        }),
        Product.belongsTo(models.Category,{
            foreignKey :'id_category',
            AS : 'categorias'
        })

    }
    return Product
}
