import { ADMIN_ADDED_GAME } from '../types'
import AdminService from '../api/AdminService'
const api = new AdminService()

export const addGame = (data) => api.addGame(data)
export const addGameToAccount = (data) => api.addGameToAccount(data)
export const addGameType = (data) => api.addGameType(data)
export const getGametypes = (data) => api.getGametypes(data)
export const getUsers = (data) => api.getUsers(data)
export const getGames = (data) => api.getGames(data)
export const giveAdminRights = (data) => api.giveAdminRights(data)
export const removeUser = (data) => api.removeUser(data)
export const removeGame = (data) => api.removeGame(data)
export const removeGameFromAccount = (data) => api.removeGameFromAccount(data)
export const setAccountBalance = (data) => api.setAccountBalance(data)
export const setLeaderboard = (data) => api.setLeaderboard(data)