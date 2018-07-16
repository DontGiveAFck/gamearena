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
}
