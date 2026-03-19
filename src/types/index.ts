export type UserRole = 'Администратор' | 'Менеджер' | 'Разработчик'

export interface User {
  id: string
  name: string
  phone: string
  role?: UserRole
}
