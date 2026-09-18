import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { profiles } from "@/lib/db/schema"
import { fuelType, vehicleType } from "@/lib/db/schema"

/**
 * A customer-owned vehicle. Mashinika's centre of gravity: every rescue,
 * inspection, repair, buy/trade and fleet action accumulates against the
 * vehicle row, giving each car a living service history / passport.
 */
export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  registration: text("registration").notNull(),
  vin: text("vin"),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  fuel: fuelType("fuel").notNull(),
  type: vehicleType("type").notNull(),
  transmission: text("transmission"),
  engineCc: integer("engine_cc"),
  mileageKm: integer("mileage_km").notNull().default(0),
  colour: text("colour"),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})