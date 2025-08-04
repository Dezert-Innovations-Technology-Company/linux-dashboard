// import { UserCreate, User } from '../pages/users/types'

// export const api = {
//   async getUsers(): Promise<User[]> {
//     const response = await fetch('/users')
//     return await response.json()
//   },

//   async createUser(user: UserCreate): Promise<[User]> {
//     const response = await fetch('/users/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     })
//     if (!response.ok) throw new Error('Failed to create user')
//     return [await response.json()]
//   },

//   async updateUser(id: number, user: User): Promise<[User]> {
//     const response = await fetch(`/users/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     })
//     if (!response.ok) throw new Error('Failed to update user')
//     return [await response.json()]
//   },

//   async deleteUser(id: number): Promise<boolean> {
//     const response = await fetch(`/users/${id}`, {
//       method: 'DELETE',
//     })
//     return response.ok
//   }
// }
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
}
