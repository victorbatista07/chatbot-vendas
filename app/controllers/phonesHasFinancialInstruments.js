module.exports = (sequelize, DataTypes) => {
    const PhonesHasFinancialInstruments = sequelize.define('PhonesHasFinancialInstruments', {
        phoID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
            unique: false,
            autoIncrement: false,
            field: 'PHO_ID',
            references: {
                model: 'Phones',
                key: 'id'
            }
        },
        finID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
            unique: false,
            autoIncrement: false,
            field: 'FIN_ID',
            references: {
                model: 'FinancialInstruments',
                key: 'id'
            }
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Phones_has_FinancialInstruments'
    });

    return PhonesHasFinancialInstruments;
};
