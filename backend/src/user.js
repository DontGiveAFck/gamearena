const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const errors = require('./errors');

const SALT_ROUNDS = 10;
const USER_ADDED = 'User added: ';

module.exports = class User {
    constructor() {
        this.Table = UserModel;
        this.Table.sync({force: false});
    }

    async addUser(req, res) {
        try {
            let data = req.body;
            console.log(data.password);
            const encryptedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
            let creds = this.Table.build({
                login: data.login,
                password: encryptedPassword,
                email: data.email,
                username: data.username
            });
            const user = await creds.save();
            console.log(USER_ADDED, user);
            res.status(200).json(JSON.stringify(user));
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async removeUserByLogin(req, res) {
        let login = req.body.login;
        try {
            //const user = await this.Table.create({login: login});
            const destroyed = await this.Table.destroy({
                where: {
                    login: login
                }
            });
            res.status(200).json(JSON.stringify(destroyed));
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await this.Table.findAll();
            res.status(200).json(JSON.stringify(users));
        } catch(err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async getUserByLogin(req, res) {
        let login = req.query.login;
        try {
            const user = await this.Table.findOne({
                where: {
                    login: login
                }
            });
            res.status(200).json(JSON.stringify(user));
        } catch(err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async signIn(req, res) {
        let data = req.body;
        try {
            const user = await this.Table.findOne({
                where: {
                    login: data.login
                }
            });
            let passwordFromDb = user.get('password');
            const match = await bcrypt.compare(data.password, passwordFromDb);
            if(match) {
                res.status(200).json(JSON.stringify(users));
            } else {
                throw new Error().code = errors.INCORRECT_CRED;
            }
        } catch(err) {
                res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }
};