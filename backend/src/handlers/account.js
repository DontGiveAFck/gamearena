const AccountModel = require('../db/models/Account');

module.exports = class Account {
    constructor() {
        this.Table = AccountModel;
        this.Table.sync();
    }

    async setBalance(req, res) {
        try {
            let newBalance = req.body.newbalance;
            let login = req.body.login;
            const account = await this.Table.update({
                balance: newBalance,
            }, {
                where: {
                    login: login
                }
            });
            res.status(200).json(account);
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async getPlayers(req, res) {
        try {
            let limit = parseInt(req.query.limit);
            const users = await this.Table.findAll({
                order: [['balance', 'DESC']],
                limit: limit
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
        }
    }


};