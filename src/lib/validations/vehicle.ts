import { z } from "zod"

import { FUEL_TYPES, VEHICLE_TYPES } from "@/types/vehicle"
import { zstring } from "@/lib/validations/common"

export const ZVehicleCreate = z.object({
  registration: zstring.nonempty("Registration is required"),
  make: zstring.nonempty("Make is required"),
  model: zstring.nonempty("Model is required"),
  year: z.coerce.number().int().min(1970).max(2027),
  type: z.enum(VEHICLE_TYPES),
  fuelType: z.enum(FUEL_TYPES),
  isDefault: z.boolean().default(false),
})

export const ZVehicleUpdate = ZVehicleCreate.partial()