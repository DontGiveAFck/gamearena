module.exports = (sequelize, Sequelize) => {
    const GameType = sequelize.define('gametypes', {
        type: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [1,50]
            },
            primaryKey: true,
        }
    })
    return GameType
}