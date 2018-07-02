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
        }
    })
    return Account
}