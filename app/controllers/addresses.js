module.exports = (sequelize, DataTypes) => {
    const Addresses = sequelize.define('Addresses', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'ADR_ID'
        },
        country: {
            type: DataTypes.STRING(3),
            allowNull: true,
            defaultValue: 'BRA',
            field: 'ADR_Country'
        },
        cep: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: 'ADR_CEP'
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: true,
            defaultValue: 'SP',
            field: 'ADR_State'
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'São Paulo',
            field: 'ADR_City'
        },
        district: {
            type: DataTypes.STRING(90),
            allowNull: false,
            field: 'ADR_District'
        },
        street: {
            type: DataTypes.STRING(90),
            allowNull: false,
            field: 'ADR_Street'
        },
        number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'ADR_Number'
        },
        complement: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'ADR_Complement'
        },
        payID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            onDelete: 'CASCADE',
            field: 'PAY_ID',
            references: {
                model: 'Payers',
                key: 'id'
            }
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
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Addresses'
    });

    Addresses.associate = function(models) {
        this.hasMany(models.FinancialInstruments);
        this.hasMany(models.Requests);
    };

    return Addresses;
};
