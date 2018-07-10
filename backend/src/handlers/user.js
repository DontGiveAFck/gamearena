const db = require('../db/database')
const bcrypt = require('bcrypt');
const errors = require('../errors');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;
const config = require('../auth/config');
const mainDir = process.cwd()

const successObject = {
    "result": "successful"
}

module.exports = class User {
    constructor() {
        db.user.sync({force: false});
    }

    async addUser(req, res) {
        try {
            let data = req.body;
            const encryptedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
            let user = db.user.build({
                login: data.login,
                password: encryptedPassword,
                email: data.email,
                username: data.username
            });
            await user.save()

            let account = db.account.build({
                balance: 0,
                userId: user.id
            });
            await account.save();

            res.status(200).json(successObject);
        } catch (err) {
            res.status(400).json({
                errors: {
                    message: err.errors[0].message
                }
            });
        }
    }

    async removeUserByUserId(req, res) {
        let userId = req.body.userid
        try {
            await db.account.update({
                status: 'removed'
            }, {
                where: {
                    userId: userId
                }
            })

            await db.user.update({
                status: 'removed'
            }, {
                where: {
                    id: userId
                }
            })

            res.status(200).json(successObject)
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    }

    async getUsers(req, res) {
        const limit = req.query.limit || 10
        const offset = req.query.offset || 0
        try {
            const users = await db.user.findAll({
                offset: offset,
                limit: limit
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    }

    async getUserById(id, cb) {
        try {
            const user = await db.user.findOne({
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
            const user = await db.user.findOne({
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
                res.cookie('token', token)
                res.status(200).json({token: token})
            } else {
                res.status(400).json({
                    errors: {
                        result: "Incorrect credentials"
                    }
                })
            }
        } catch (err) {
            res.status(400).json({
                errors: {
                    result: "Incorrect credentials"
                }
            });
        }
    }

    async makeAdmin(req, res) {
        try {
            const userId = req.body.id;
            const newAdmin = await db.user.update({
                admin: 1
            }, {
                where: {
                    id: userId
                }
            })
            res.status(200).json(successObject)
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async addAvatar(req, res) {
        if (!req.files) {
            return res.status(400).send(JSON.stringify({'result': 'no file'}))
        }

        try {
            const avatar = req.files.avatar
            const token = req.cookies.token
            const decoded = jwt.decode(token, {complete: true})
            const avatarPath = mainDir + '/pictures/user/avatars/user' + decoded.payload.id + '.jpg'

            await avatar.mv(avatarPath)

            await db.user.update({
                avatar: avatarPath
            }, {
                where: {
                    id: decoded.payload.id
                }
            })
            res.status(200).json(successObject)
        } catch (err) {
            return res.status(400).json(err)

        }
    }

    /* only for testing */
    async makeMeAdmin(req, res) {
        try {
            const token = req.cookies.token
            const decoded = jwt.decode(token, {complete: true})
            const userId = decoded.payload.id

            await db.user.update({
                admin: 1
            }, {
                where: {
                    id: userId
                }
            })
            res.status(200).json(successObject)
        } catch (err) {
            return res.status(400).json(err)
        }
    }
}
