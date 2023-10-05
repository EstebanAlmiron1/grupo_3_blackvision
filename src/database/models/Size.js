module.exports= function(sequelize,DataTypes){
    let alias = 'Size'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        size:{
            type: DataTypes.STRING
        },
    }
    let config = {
        tableName: 'size',
        timestamps: false,
    }
    let Size = sequelize.define(alias,cols,config)
    return Size
}