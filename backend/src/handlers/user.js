const db = require('../db/database')
const bcrypt = require('bcrypt');
const errors = require('../errors');
const jwt = require('jsonwebtoken');
const path = require('path')
const util = require('util')
const SALT_ROUNDS = 10;
const USER_ADDED = 'User added: ';
const config = require('../auth/config');
const mainDir = process.cwd()

module.exports = class User {
    constructor() {
        this.userTable = db.users
        this.TableAccount = db.accounts
        this.userTable.sync({force: false});
    }

    async addUser(req, res) {
        try {
            let data = req.body;
            console.log(data.password);
            const encryptedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
            let creds = this.userTable.build({
                login: data.login,
                password: encryptedPassword,
                email: data.email,
                username: data.username
            });
            const user = await creds.save();
            console.log(USER_ADDED, user);
            let userAccount = this.TableAccount.build({
                login: data.login,
                balance: 0,
                userId: user.id
            });
            const account = await userAccount.save();
            console.log(account);
            res.status(200).json(JSON.stringify(user));
        } catch (err) {
            res.status(400).json(JSON.stringify({'error': err.code}));
            console.log(err);
        }
    }

    async removeUserByLogin(req, res) {
        let login = req.body.login
        try {
            const removed = await this.userTable.update({
                status: 'removed'
            }, {
                where: {
                    login: login
                }
            })

            res.status(200).json(JSON.stringify(removed))
        } catch (err) {
            res.status(400).json(JSON.stringify({'error': err.code}));
            console.log(err);
        }
    }

    async getUsers(req, res) {
        const limit = req.query.limit || 10;
        try {
            const users = await this.userTable.findAll({
                limit: limit
            });
            res.status(200).json(JSON.stringify(users));
        } catch (err) {
            res.status(400).json(JSON.stringify({'error': err.code}));
            console.log(err);
        }
    }

    async getUserById(id, cb) {
        try {
            const user = await this.userTable.findOne({
                where: {
                    id: id
                }
            });
            cb(null, user);
        } catch (err) {
            console.log(err);
        }
    }

    async signIn(req, res) {
        let data = req.body;
        try {
            const user = await this.userTable.findOne({
                where: {
                    login: data.login
                }
            });
            let passwordFromDb = user.get('password');
            const match = await bcrypt.compare(data.password, passwordFromDb);
            if (match) {
                let payload = {
                    id: user.get('id'),
                    admin: user.get('admin')
                };
                const token = jwt.sign(payload, config.jwtOptions.secretOrKey);
                res.cookie('token', token);
                res.status(200).json({token: token})
                //res.status(200).json(JSON.stringify(users));
            } else {
                throw new Error().code = errors.INCORRECT_CRED;
            }
        } catch (err) {
            res.status(400).json(JSON.stringify({'error': err.code}));
            console.log(err);
        }
    }

    async makeAdmin(req, res) {
        try {
            const userId = req.body.id;
            const newAdmin = await this.userTable.update({
                admin: 1
            }, {
                where: {
                    id: userId
                }
            })
            res.status(200).json(JSON.stringify(newAdmin))
        } catch (err) {
            res.status(400).json(JSON.stringify({'error': err.code}));
            console.log(err);
        }
    }

    async addAvatar(req, res) {
        if (!req.files) {
            return res.status(400).send(JSON.stringify({error: 'No file'}))
        }

        try {
            const avatar = req.files.avatar
            const token = req.cookies.token
            const decoded = jwt.decode(token, {complete: true})
            const avatarPath = mainDir + '/pictures/users/avatars/user' + decoded.payload.id + '.jpg'

            await avatar.mv(avatarPath)

            await this.userTable.update({
                avatar: avatarPath
            }, {
                where: {
                    id: decoded.payload.id
                }
            })
            res.status(200).json({'result' : 'success'})
        } catch (err) {
            return res.status(500).json(err)

        }
    }
}
