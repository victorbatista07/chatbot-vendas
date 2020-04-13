module.exports = (sequelize, DataTypes) => {
    const Phones = sequelize.define('Phones', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'PHO_ID'
        },
        ddi: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            allowNull: true,
            defaultValue: 55,
            field: 'PHO_DDI'
        },
        ddd: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            allowNull: true,
            defaultValue: 11,
            field: 'PHO_DDD'
        },
        number: {
            type: DataTypes.INTEGER(9).UNSIGNED,
            allowNull: false,
            field: 'PHO_Number'
        },
        description: {
            type: DataTypes.STRING(15),
            allowNull: true,
            field: 'PHO_Description'
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
        tableName: 'Phones'
    });

    Phones.associate = function(models) {
        this.hasMany(models.PhonesHasFinancialInstruments);
        this.hasMany(models.Requests);
    };

    return Phones;
};
