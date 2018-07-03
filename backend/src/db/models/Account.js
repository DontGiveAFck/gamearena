module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define('accounts', {
        userId: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false /*,
            references: {
                model: UserModel,
                key: 'id',
            }
            */
        },
        balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: Sequelize.STRING,
            enum: ['active', 'removed', 'blocked'],
            defaultValue: 'active'
        }
    })
    return Account
}