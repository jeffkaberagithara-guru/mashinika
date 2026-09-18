export type UserId = string

export const USER_ROLES = ["CUSTOMER", "TECHNICIAN", "DISPATCHER", "ADMIN"] as const
export type UserRole = (typeof USER_ROLES)[number]

export const ROLES_BY_ACCESS = {
  public: [],
  customer: ["CUSTOMER"],
  technician: ["TECHNICIAN"],
  dispatcher: ["DISPATCHER", "ADMIN"],
  admin: ["ADMIN"],
} as const
export type RoleAccess = typeof ROLES_BY_ACCESS

export interface User {
  id: UserId
  name: string | null
  phone: string | null
  email: string | null
  roles: UserRole[]
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}