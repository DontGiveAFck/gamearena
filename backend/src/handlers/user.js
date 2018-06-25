const UserModel = require('../db/models/User');
const AccountModel = require('../db/models/Account');
const bcrypt = require('bcrypt');
const errors = require('../errors');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;
const USER_ADDED = 'User added: ';
const config = require('../auth/config');

module.exports = class User {
    constructor() {
        this.Table = UserModel;
        this.TableAccount = AccountModel;
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
            let userAccount = this.TableAccount.build({
                login: data.login,
                balance: 0
            });
            const account = await userAccount.save();
            console.log(account);
            res.status(200).json(JSON.stringify(user));
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async removeUserByLogin(req, res) {
        let login = req.body.login;
        try {
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
        const limit = req.query.limit || 10;
        try {
            const users = await this.Table.findAll({
                limit: limit
            });
            res.status(200).json(JSON.stringify(users));
        } catch (err) {
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
        } catch (err) {
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
            if (match) {
                let payload = {
                    id: user.get('id'),
                    login: user.get('login')
                };
                const token = jwt.sign(payload, config.jwtOptions.secretOrKey);
                res.cookie('token', token);
                res.status(200).json({token: token})
                //res.status(200).json(JSON.stringify(users));
            } else {
                throw new Error().code = errors.INCORRECT_CRED;
            }
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err}));
            console.log(err);
        }
    }
}
