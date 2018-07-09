import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from '../types'
import api from '../api'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
})

export const userSignedUp = () => ({
    type: USER_SIGNED_UP
})

export const login = (data) => dispatch =>
    api.user.login(data).then(user => dispatch(userLoggedIn(user)))

export const logout = () => dispatch => {
    cookies.remove('token')
    dispatch(userLoggedOut())
}

export const signup = (data) => dispatch =>
    api.user.signup(data).then(user => dispatch(userSignedUp(user)))

