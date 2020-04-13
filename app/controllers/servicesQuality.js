module.exports = (sequelize, DataTypes) => {
    const ServicesQuality = sequelize.define('ServicesQuality', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'QOR_ID'
        },
        response: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'QOR_Response'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'QOR_Date'
        },
        CON_ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'CON_ID',
            references: {
                model: 'Conversations',
                key: 'id'
            }
        }
    });

    return ServicesQuality;
};
