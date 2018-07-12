import RestService from './RestService'

export default class AuthService extends RestService {
	constructor() {
		super()
	}

	signup(data) {
		return super.create({
			login: data.login,
			password: data.password,
			email: data.email,
			username: data.username
		}, '/signup').then(res => res)
	}

	signin(credentials) {
		return super.sendForm({
			login: credentials.login,
			password: credentials.password
		}, '/signin').then(res => res)
	}
}
