module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'USE_ID'
        },
        register: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
            field: 'USE_Register'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'USE_Name'
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Users'
    });

    Users.associate = function(models) {
        this.hasMany(models.Conversations);
    };

    return Users;
};
