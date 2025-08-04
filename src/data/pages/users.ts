import { User, UserCreate } from '../../pages/users/types'
import { api } from '../../services/api'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  isActive: boolean
  search: string
}

export const getUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  const { isActive, search } = filters
  let filteredUsers: User[] = await api.getUsers()

  if (isActive !== undefined) {
    filteredUsers = filteredUsers.filter((user) => user.is_active === isActive)
  }

  if (search) {
    filteredUsers = filteredUsers.filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase()))
  }

  const { page = 1, perPage = 10 } = filters || {}

  return {
    data: filteredUsers.slice((page - 1) * perPage, page * perPage),
    pagination: {
      page,
      perPage,
      total: filteredUsers.length,
    },
  }
}

export const addUser = async (user: UserCreate): Promise<User> => {
  const payload: UserCreate = {
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    role: user.role,
    avatar: user.avatar,
    is_active: user.is_active ?? true,
    projects: user.projects ?? [],
  }

  return await api.createUser(payload)
}

export const updateUser = async (user: User): Promise<User> => {
  return await api.updateUser(user.id, user)
}

export const removeUser = async (user: User) => {
  return await api.deleteUser(user.id)
}

export const uploadAvatar = async (body: FormData) => {
  return await fetch('/avatars', { method: 'POST', body }).then((r) => r.json())
}
