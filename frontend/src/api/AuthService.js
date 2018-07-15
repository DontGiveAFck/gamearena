import RestService from './RestService'

export default class AuthService extends RestService {
	signup(data) {
		return super.create({
			login: data.login,
			password: data.password,
			email: data.email,
			username: data.username
		}, '/signup')
	}

	signin(credentials) {
		return super.sendForm({
			login: credentials.login,
			password: credentials.password
		}, '/signin')
	}
}
