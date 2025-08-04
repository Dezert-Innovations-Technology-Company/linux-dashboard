//  custom roles
export type UserRole = 'admin' | 'user'

// UUID type format
export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type User = {
  id: number
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar: string
  projects?: UUID[]
  is_active: boolean
}

// This is for creating users from the frontend (no id)
export type UserCreate = {
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar?: string
  is_active?: boolean
  projects?: UUID[] // Optional, sent from frontend
}
