module.exports= function(sequelize,DataTypes){
    let alias = 'Color'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING(20)
        },
    }
    let config = {
        tableName: 'colors',
        timestamps: false,
        /*paranoid: true,
        deletedAt: "deleted_at",        //Preguntar
        updatedAt: "updated_at",         
        createdAt: "created_at"*/          
    }
    let Color = sequelize.define(alias,cols,config)
    Color.associate = function (models) {
        Color.hasMany(models.Product,{
           foreignKey :'id_color',
           AS : 'productos'
        })
    }
    return Color
}