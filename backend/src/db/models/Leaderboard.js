module.exports = (sequelize, Sequelize) => {
    const Leaderboard = sequelize.define('leaderboards', {
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
    return Leaderboard
}
