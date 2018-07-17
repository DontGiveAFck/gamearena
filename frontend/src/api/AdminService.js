import RestService from './RestService'

export default class AdminService extends RestService {
    addGame(data) {
        return super.sendForm({
            title: data.title,
            description: data.description,
            type: data.type
        }, '/admin/game')
    }

    addGameToAccount(data) {
        return super.sendForm({
            gameid: data.gameId,
            accountid: data.accountId
        }, '/admin/account/game')
    }

    addGameType(data) {
        return super.sendForm({
            type: data.type
        }, '/admin/gametype')
    }

    getGametypes(params) {
        return super.findAll({
            params: params
        }, 'admin/gametype')
    }

    getUsers(params) {
        return super.findAll({
            params: params
        }, 'admin/user')
    }
    giveAdminRights(data) {
        return super.update({
            id: data.userId
        }, 'admin/makeadmin')
    }
    removeUser(data) {
        return super.delete({
            userid: data.userId
        }, 'admin/user')
    }
    removeGame(data) {
        return super.delete({
            gameid: data.gameId
        }, 'admin/game')
    }
    removeGameFromAccount(data) {
        return super.delete({
            gameid: data.gameId,
            accountid: data.accountId
        }, 'admin/account/game')
    }
    setAccountBalance(data) {
        return super.update({
            accountid: data.accountId,
            newbalance: data.newBalance
        }, 'admin/account/setbalance')
    }
    setLeaderboard(data) {
        return super.update({
            accountid: data.accountId,
            gameid: data.gameId,
            score: data.score
        }, 'admin/account/leaderboard')
    }
}