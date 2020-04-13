module.exports = (sequelize, DataTypes) => {
    const Payers = sequelize.define('Payers', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'PAY_ID'
        },
        name: {
            type: DataTypes.STRING(90),
            allowNull: false,
            field: 'PAY_Name'
        },
        email: {
            type: DataTypes.STRING(90),
            allowNull: false,
            field: 'PAY_Email'
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'PAY_BirthDate'
        },
        cpf_cnpj: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'PAY_CPF_CNPJ'
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
        tableName: 'Payers'
    });

    Payers.associate = function(models) {
        this.hasMany(models.Addresses);
        this.hasMany(models.Phones);
    };

    return Payers;
};
