module.exports = (sequelize, DataTypes) => {
    const RequestsHasProducts = sequelize.define('RequestsHasProducts', {
        reqID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
            unique: false,
            autoIncrement: false,
            field: 'REQ_ID',
            references: {
                model: 'Requests',
                key: 'id'
            }
        },
        proID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
            unique: false,
            autoIncrement: false,
            field: 'PRO_ID',
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        unitPrice: {
            type: DataTypes.DECIMAL(8, 2).UNSIGNED,
            allowNull: false,
            field: 'RHP_UnitPrice'
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'RHP_Amount'
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false,
            field: 'RHP_TotalPrice'
        },
        addition: {
            type: DataTypes.DECIMAL(9, 2).UNSIGNED,
            allowNull: true,
            field: 'RHP_Addition'
        },
        discount: {
            type: DataTypes.DECIMAL(9, 2).UNSIGNED,
            allowNull: true,
            field: 'RHP_Discount'
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Requests_has_Products'
    });

    return RequestsHasProducts;
};
