module.exports = (sequelize, Sequelize) => {
    const AccountGame = sequelize.define('accounts_games', {
        /*
        accountId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: AccountModel,
                key: 'id',
            }

        },
        gameId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: GameModel,
                key: 'id',
            }

        }
        */

    })
    return AccountGame
}
