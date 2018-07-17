import RestService from './RestService'

export default class UserService extends RestService {
	uploadAvatar(data) {
		return super.sendForm(data, '/user/avatar/add', {
			headers: {
				'Content-Type': 'muptipart/form-data'
			}
		}).then(res => res)
	}
    getGames(params) {
        return super.findAll({
            params: params
        }, 'user/game')
    }
    getAccountGames(params) {
        return super.findAll({
            params: params
        }, 'user/account/game')
    }
    getLeaderboardByPlayer(params) {
        return super.findAll({
            params: params
        }, 'user/leaderboard/account')
    }
    getLeaderboardByGame(params) {
        return super.findAll({
            params: params
        }, 'user/leaderboard/game')
    }
}
