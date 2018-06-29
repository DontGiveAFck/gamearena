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

db.users = require('./models/User')(sequelize, Sequelize)
db.accounts = require('./models/Account')(sequelize, Sequelize)
db.accountsgames = require('./models/AccountGame')(sequelize, Sequelize)
db.games = require('./models/Game')(sequelize, Sequelize)
db.leaderboards = require('./models/Leaderboard')(sequelize, Sequelize)
db.gametypes = require('./models/Gametype')(sequelize, Sequelize)

// one to one: 1 user - 1 account(foreign key in account)
db.users.hasOne(db.accounts)
db.accounts.belongsTo(db.users)

db.games.hasMany(db.leaderboards)
db.accounts.hasMany(db.leaderboards)

// one to many: 1 gametype - many games (foreign key in games)
//db.gametypes.hasMany(db.games)
db.games.belongsTo(db.gametypes, {as: 'gametype',foreignKey: 'type'})

// many to many: many accounts - many games (through accounts_games)
db.games.belongsToMany(db.accounts, {through: db.accountsgames})
db.accounts.belongsToMany(db.games, {through: db.accountsgames})



module.exports = db