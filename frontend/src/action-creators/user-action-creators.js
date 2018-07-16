import { USER_AVATAR_UPLOADED } from '../types'
import UserService from '../api/UserService'

const api = new UserService()

export const userAvatarUploaded = user => ({
	type: USER_AVATAR_UPLOADED,
	user
})

export const uploadAvatar = (data) => dispatch =>
	api.uploadAvatar(data).then(user => dispatch(userAvatarUploaded(user)))

export const getGames = (data) => api.getGames(data)

