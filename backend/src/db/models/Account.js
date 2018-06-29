module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define('accounts', {
        login: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [5, 20]
            }/*,

            references: {
                model: UserModel,
                key: 'login',
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