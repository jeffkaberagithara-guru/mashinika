import { z } from 'zod'

import { USER_ROLES } from '@/types/user'
import { ZEmail, ZPhone } from '@/lib/validations/common'

export const ZProfileCreate = z.object({
  phone: ZPhone,
  email: ZEmail,
  displayName: z.string().trim().max(80).nullable(),
  roles: z.enum(USER_ROLES).array().default(['CUSTOMER']),
})

export const ZProfileUpdate = ZProfileCreate.partial()

export const ZUserRoles = z.enum(USER_ROLES).array()
