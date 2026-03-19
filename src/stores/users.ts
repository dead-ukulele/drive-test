import { defineStore } from 'pinia'
import type { User } from '@/types'

const STORAGE_KEY = 'users'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    addUser(payload: Omit<User, 'id'>) {
      const newUser: User = {
        id: crypto.randomUUID(),
        name: payload.name,
        phone: payload.phone,
        role: payload.role,
      }
      this.users.push(newUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    },
    removeUser(id: string) {
      this.users = this.users.filter((user) => user.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    },
    loadFromLocalStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as User[]
          if (Array.isArray(parsed)) this.users = parsed
        }
      } catch {
        this.users = []
      }
    },
  },
})
