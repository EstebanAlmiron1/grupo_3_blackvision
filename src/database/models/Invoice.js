module.exports= function(sequelize,DataTypes){
    let alias = 'Invoice'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
        },
        date:{
            type: DataTypes.DATE
        },
        number:{
            type: DataTypes.INTEGER
        },
        total:{
            type: DataTypes.DECIMAL
        },
        id_users:{
            type: DataTypes.INTEGER
        },
        id_type:{
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
        tableName: 'invoices',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Invoice = sequelize.define(alias,cols,config)
    Invoice.associate = function (models) {
        Invoice.belongsTo(models.Type,{
            foreignKey :'id_type',
            as : 'tipo'
        }),
        Invoice.belongsToMany(models.Product,{
            foreignKey :'id_products',
            through: 'Invoice_product',
            otherKey:'id_invoices',
            timestamps: false,
            as : 'productos'            
        }), 
        Invoice.belongsTo(models.User,{
            foreignKey :'id_users',
            as : 'usuario'
        })

    }  
    return Invoice
}