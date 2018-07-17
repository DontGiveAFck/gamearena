import UserService from '../api/UserService'

const api = new UserService()

export const uploadAvatar = (data) => api.uploadAvatar(data)
export const getGames = (data) => api.getGames(data)
export const getAccountGames = (data) => api.getAccountGames(data)
export const getLeaderboardByPlayer = (data) => api.getLeaderboardByPlayer(data)
export const getLeaderboardByGame = (data) => api.getLeaderboardByGame(data)
