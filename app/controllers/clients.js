module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define('Clients', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'CLI_ID'
        },
        name: {
            type: DataTypes.STRING(90),
            allowNull: false,
            field: 'CLI_Name'
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Clients'
    });

    Clients.associate = function(models) {
        this.hasMany(models.Addresses);
        this.hasMany(models.Payers);
        this.hasMany(models.Phones);
        this.hasMany(models.Requests);
    };

    return Clients;
};
