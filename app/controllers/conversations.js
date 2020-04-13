module.exports = (sequelize, DataTypes) => {
    const Conversations = sequelize.define('Conversations', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            field: 'CON_ID'
        },
        register: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'CON_Register'
        },
        channel: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'CON_Channel'
        },
        url: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'CON_URL'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'CON_Date'
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            field: 'CON_Active'
        },
        greeting: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            field: 'CON_Greeting'
        },
        voteResponse: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            field: 'CON_VoteResponse'
        },
        voteService: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            field: 'CON_VoteService'
        },
        qtdNone: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            field: 'CON_QtdNone'
        },
        lastIntent: {
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: 'None',
            field: 'CON_LastIntent'
        },
        useID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'USE_ID',
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        botID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            field: 'BOT_ID',
            references: {
                model: 'Bots',
                key: 'id'
            }
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'Conversations'
    });

    Conversations.associate = function(models) {
        this.hasMany(models.ResponsesQuality);
        this.hasMany(models.ServicesQuality);
    };

    return Conversations;
};
