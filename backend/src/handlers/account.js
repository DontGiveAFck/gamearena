const AccountModel = require('../db/models/Account');

module.exports = class Account {
    constructor() {
        this.Table = AccountModel;
        this.Table.sync();
    }

    async setBalance(login, newBalance) {
        try {
            await this.Table.update({
                balance: newBalance,
            }, {
                where: {
                    login: login
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
};