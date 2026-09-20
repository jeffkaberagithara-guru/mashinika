import { z } from 'zod'

export const ZGeoPoint = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

export const ZGeoBounds = z.object({
  southwest: ZGeoPoint,
  northeast: ZGeoPoint,
})

export const ZAddress = z.object({
  line1: z.string().trim().nullable(),
  line2: z.string().trim().nullable(),
  locality: z.string().trim().nullable(),
  region: z.string().trim().nullable(),
  country: z.string().trim().nullable(),
  postalCode: z.string().trim().nullable(),
})

export const ZGeoLocation = ZGeoPoint.extend({
  address: ZAddress.nullable(),
  landmark: z.string().trim().nullable(),
  area: z.string().trim().nullable(),
})
