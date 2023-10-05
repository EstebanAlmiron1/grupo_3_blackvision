module.exports= function(sequelize,DataTypes){
    let alias = 'Invoice_product'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        price:{
            type: DataTypes.DECIMAL
        },
        quantity:{
            type: DataTypes.INTEGER
        },
        id_invoices:{
            type: DataTypes.INTEGER
        },
        id_products:{
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'invoice_products',
        timestamps: false
    }
    let Invoice_product = sequelize.define(alias,cols,config)
    return Invoice_product
}