module.exports = (sequelize, DataTypes) => {
    const Requests = sequelize.define('Requests', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'REQ_ID'
        },
        payment: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'REQ_Payment'
        },
        orderDay: {
            type: DataTypes.DATE,
            allouwNull: false,
            field: 'REQ_OrderDay'
        },
        delivery: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'REQ_Delivery'
        },
        currency: {
            type: DataTypes.STRING(3),
            allowNull: true,
            defaultValue: 'BRL',
            field: 'REQ_Currency'
        },
        shipping: {
            type: DataTypes.DECIMAL(9, 2).UNSIGNED,
            allowNull: true,
            defaultValue: 0.0,
            field: 'REQ_Shipping'
        },
        cliID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'CLI_ID',
            references: {
                model: 'Clients',
                key: 'id'
            }
        },
        adrID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'ADR_ID',
            references: {
                model: 'Addresses',
                key: 'id'
            }
        },
        phoID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'PHO_ID',
            references: {
                model: 'Phones',
                key: 'id'
            }
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Requests'
    });

    Requests.associate = function(models) {
        this.belongsTo(models.Clients);
    };

    return Requests;
};
