import axios from 'axios'

export default {
    user: {
        login: (credentials) =>
            axios.post('/signin', {
                login: credentials.login,
                password: credentials.password })
                .then(res => res.data),

        signup: (data) =>
            axios.post('/signup', {
                login: data.login,
                password: data.password,
                email: data.email,
                username: data.username })
                .then(res => res.data)
    }
}
