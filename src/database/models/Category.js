module.exports= function(sequelize,DataTypes){
    let alias = 'Category'
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
    let Category = sequelize.define(alias,cols,config)
    Category.associate = function (models) {
        Category.hasMany(models.Product,{
           foreignKey :'id_category',
           AS : 'productos'
        })
    }
    return Category
}