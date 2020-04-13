module.exports = (sequelize, DataTypes) => {
    const Bots = sequelize.define('Bots', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'BOT_ID'
        },
        register: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
            field: 'BOT_Register'
        },
        description: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'BOT_Description'
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Bots'
    });

    Bots.associate = function(models) {
        this.hasMany(models.Conversations);
    };

    return Bots;
};
