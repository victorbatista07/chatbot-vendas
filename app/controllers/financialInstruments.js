module.exports = (sequelize, DataTypes) => {
    const FinancialInstruments = sequelize.define('FinancialInstruments', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'FIN_ID'
        },
        description: {
            type: DataTypes.STRING(11),
            allowNull: true,
            defaultValue: 'CREDIT_CARD',
            field: 'FIN_Description'
        },
        expirationMonth: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'FIN_ExpirationMonth'
        },
        expirationYear: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'FIN_ExpirationYear'
        },
        cardNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'FIN_CardNumber'
        },
        cvc: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'FIN_CVC'
        },
        name: {
            type: DataTypes.STRING(65),
            allowNull: false,
            field: 'FIN_Name'
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'FIN_BirthDate'
        },
        cpf_cnpj: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'FIN_CPF_CNPJ'
        },
        payID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'PAY_ID',
            references: {
                model: 'Payers',
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
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'FinancialInstruments'
    });

    FinancialInstruments.associate = function(models) {
        this.hasMany(models.PhonesHasFinancialInstruments);
    };

    return FinancialInstruments;
};
