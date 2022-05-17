module.exports = (sequelize, DataTypes) => {

    let alias = 'Product';

    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'products',        
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);
    
    return Product
}