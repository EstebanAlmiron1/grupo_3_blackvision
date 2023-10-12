module.exports= function(sequelize,DataTypes){
    let alias = 'Type'
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
        tableName: 'type',
        timestamps: false,
    }
    let Type = sequelize.define(alias,cols,config)
    Type.associate = function (models) {
        Type.hasMany(models.Invoice,{
           foreignKey :'id_type',
           AS : 'facturas'
        })
    }
    return Type
}