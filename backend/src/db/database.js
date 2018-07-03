const Sequelize = require('sequelize');
const errors = require('../errors');

const CONNECTION_ESTABLISHED = 'Connection established';
const CREATE_DATABASE = 'CREATE DATABASE gamearena';
const ERR_CONNECTION = 'Something wrong with DB connection:';

let sequelize;

sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

(async () => {
    try {
        const auth = await sequelize.authenticate();
        console.log(CONNECTION_ESTABLISHED);
    } catch (err) {
        if (err.original.code == errors.BAD_DB_ERROR) {
            sequelize = new Sequelize(`${dbconfig.dialect}://${dbconfig.username}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}`);
            await sequelize.query(CREATE_DATABASE);
            sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
                host: dbconfig.host,
                dialect: dbconfig.dialect,
                operatorsAliases: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
            });
            console.log(CONNECTION_ESTABLISHED);
        } else {
            console.log(ERR_CONNECTION, err.original.code);
        }
    }
})();

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.user = require('./models/User')(sequelize, Sequelize)
db.gametype = require('./models/Gametype')(sequelize, Sequelize)
db.game = require('./models/Game')(sequelize, Sequelize)
db.account = require('./models/Account')(sequelize, Sequelize)
db.accountgame = require('./models/AccountGame')(sequelize, Sequelize)
db.leaderboard = require('./models/Leaderboard')(sequelize, Sequelize)

// one to one: 1 user - 1 account(foreign key in account)
db.user.hasOne(db.account)
db.account.belongsTo(db.user)

db.game.hasMany(db.leaderboard, {foreignKey: 'gameId', })
db.account.hasMany(db.leaderboard, {foreignKey: 'accountId'})
db.leaderboard.belongsTo(db.account)
//db.leaderboard.belongsTo(db.game, {as: 'gameId'})

// one to many: 1 gametype - many game (foreign key in game)
//db.gametype.hasMany(db.game)
db.game.belongsTo(db.gametype, {as: 'gametype',foreignKey: 'type'})

// many to many: many account - many game (through accounts_games)
db.game.belongsToMany(db.account, {through: db.accountgame})
db.account.belongsToMany(db.game, {through: db.accountgame})

module.exports = db