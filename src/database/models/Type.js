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
    return Type
}