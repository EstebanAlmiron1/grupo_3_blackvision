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
           as : 'colores'
        }),
        Product.belongsTo(models.Brand,{
            foreignKey :'id_brand',
            as : 'marcas'
        }),
        Product.belongsTo(models.Size,{
            foreignKey :'id_size',
            as : 'talles'
        }),
        Product.belongsTo(models.Category,{
            foreignKey :'id_category',
            as : 'categorias'
        }),
        Product.belongsToMany(models.Invoice,{
            foreignKey :'id_invoices',
            through: 'Invoice_product',
            otherKey:'id_products',
            timestamps: false,
            as : 'facturas'
        })

    }
    return Product
}
