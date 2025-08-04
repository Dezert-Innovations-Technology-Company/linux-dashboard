import { defineStore } from 'pinia'
import {
  addUser,
  type Filters,
  getUsers,
  Pagination,
  removeUser,
  Sorting,
  updateUser,
  uploadAvatar,
} from '../data/pages/users'
import { User } from '../pages/users/types'

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      items: [] as User[],
      pagination: { page: 1, perPage: 10, total: 0 },
    }
  },

  actions: {
    async getAll(options: { pagination?: Pagination; sorting?: Sorting; filters?: Partial<Filters> }) {
      const { data, pagination } = await getUsers({
        ...options.filters,
        ...options.sorting,
        ...options.pagination,
      })
      this.items = data
      this.pagination = pagination
    },

    async add(user: User) {
      try {
        const newUser = await addUser(user)
        this.items.unshift(newUser)
        console.log('User added:', newUser)
        return newUser
      } catch (e) {
        console.error('Failed to add user:', e)
        throw e
      }
    },

    async update(user: User) {
      try {
        const updatedUser = await updateUser(user)
        const index = this.items.findIndex(({ id }) => id === user.id)
        if (index !== -1) {
          this.items.splice(index, 1, updatedUser)
        }
        console.log('User updated:', updatedUser)
        return updatedUser
      } catch (e) {
        console.error('Failed to update user:', e)
        throw e
      }
    },

    async remove(user: User) {
      try {
        const isRemoved = await removeUser(user)
        if (isRemoved) {
          const index = this.items.findIndex(({ id }) => id === user.id)
          if (index !== -1) {
            this.items.splice(index, 1)
          }
          console.log('User removed:', user)
        }
        return isRemoved
      } catch (e) {
        console.error('Failed to remove user:', e)
        throw e
      }
    },

    async uploadAvatar(formData: FormData) {
      return uploadAvatar(formData)
    },
  },
})
