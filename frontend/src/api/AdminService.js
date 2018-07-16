import RestService from './RestService'

export default class AdminService extends RestService {
    addGame(data) {
        return super.sendForm({
            title: data.title,
            description: data.description/*,
            type: data.type*/
        }, '/admin/game').then(data => data)
    }

    addGameToAccount(data) {
        return super.sendForm({
            gameid: data.gameId,
            accountid: data.accountId
        }, '/admin/account/game').then(data => data)
    }

    addGameType(data) {
        return super.sendForm({
            type: data.type
        }, '/admin/gametype').then(data => data)
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
    getGames(params) {
        return super.findAll({
            params: params
        }, 'user/game')
    }
    giveAdminRights(data) {
        return super.update({
            id: data.userId
        }, 'admin/makeadmin')
    }
    removeUser(data) {
        console.log('USERID: ', data.userId)
        return super.delete({
            userid: data.userId
        }, 'admin/user')
    }
}