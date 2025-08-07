import { defineStore } from 'pinia'
import { api } from '../services/api'
import type { User, UserCreate } from '../pages/users/types'

export const useUsersStore = defineStore('users', {
  state: () => ({
    items: [] as User[],
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
    },
  }),

  actions: {
    async getAll() {
      const users = await api.getUsers()
      this.items = users
      this.pagination.total = users.length
    },

    async add(user: UserCreate) {
      const newUser = await api.createUser(user)
      await this.getAll()
      return newUser
    },

    async update(user: User) {
      const updated = await api.updateUser(user.id, user)
      await this.getAll()
      return updated
    },

    async remove(user: User) {
      await api.deleteUser(user.id)
      await this.getAll()
    },
  },
})
