import { ADMIN_ADDED_GAME } from '../types'
import AdminService from '../api/AdminService'
const api = new AdminService()

export const addGame = (data) => api.addGame(data)
export const addGameToAccount = (data) => api.addGameToAccount(data)
export const addGameType = (data) => api.addGameType(data)
export const getGametypes = (data) => api.getGametypes(data)