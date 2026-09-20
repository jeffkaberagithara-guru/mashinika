import { z } from 'zod'

/** UUID v4, as emitted by `crypto.randomUUID()`. */
export const zuuid = z.string().uuid()

/** Generic string IDs kept loose because PG `uuid` columns carry the typing. */
export const Zid = z.string().min(1)

export const zstring = z.string().trim()
export const zoptionalString = zstring.nullable().optional()
export const znullableString = zstring.nullable()

export const ZPhone = z
  .string()
  .trim()
  .regex(/^\+?[0-9]{9,15}$/, 'Enter a valid phone number')

export const ZEmail = z.string().trim().email().nullable().optional()

export const ZTimestamp = z.string().datetime({ offset: true })
export const ZOptionalTimestamp = ZTimestamp.nullable().optional()

/** Kenyan Shilling amounts: 0.00 up to 9,999,999.99. */
export const ZKes = z.coerce.number().min(0).max(9_999_999.99)

export const ZPercent = z.coerce.number().min(0).max(100)
