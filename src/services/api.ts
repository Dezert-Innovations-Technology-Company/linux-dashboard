import type { User, UserCreate } from '../pages/users/types'
import axios from './axios'

export const api = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get('/users/')
    return response.data
  },

  async createUser(user: UserCreate): Promise<User> {
    const response = await axios.post('/users/', user)
    return response.data
  },

  async updateUser(id: number, user: User): Promise<User> {
    const response = await axios.put(`/users/${id}`, user)
    return response.data
  },

  async deleteUser(id: number): Promise<boolean> {
    const response = await axios.delete(`/users/${id}`)
    return response.status === 204
  },
    // Dummy project methods to silence TypeScript errors for now
  allProjects: () => '/api/projects',
  project: (id: number) => `/api/projects/${id}`,
}


