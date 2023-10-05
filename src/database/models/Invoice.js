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
    return Invoice
}