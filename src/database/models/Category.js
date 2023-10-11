module.exports= function(sequelize,DataTypes){
    let alias = 'category'
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
        tableName: 'category',
        timestamps: false,
    }
    let category = sequelize.define(alias,cols,config)
    return category
}