module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'PRO_ID'
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'PRO_Description'
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'FOOD,_BEVERAGES_AND_TOBACCO',
            field: 'PRO_Category'
        },
        details: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'PRO_Details'
        },
        price: {
            type: DataTypes.DECIMAL(8, 2).UNSIGNED,
            allowNull: false,
            field: 'PRO_Price'
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            field: 'PRO_Amount'
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Products'
    });

    Products.associate = function(models) {
        this.hasMany(models.RequestsHasProducts);
    };

    return Products;
};
