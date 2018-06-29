module.exports = (sequelize, Sequelize) => {
    const Leaderboards = sequelize.define('leaderboard', {
        score: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        accountId: {
            type: Sequelize.INTEGER,
            unique: 'unique'
        },
        gameId: {
            type: Sequelize.INTEGER,
            unique: 'unique'
        }
    })
    return Leaderboards
}
