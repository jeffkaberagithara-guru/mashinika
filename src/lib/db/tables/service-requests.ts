import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { profiles, serviceRequestStatus, serviceType } from "@/lib/db/schema"
import { vehicles } from "@/lib/db/tables/vehicles"

/**
 * A roadside/service request raised against a vehicle. This is the spine of
 * Mashinika Rescue: the rescue lifecycle (created -> assigned -> en route ->
 * arrived -> diagnosing -> repairing/towing -> completed) lives on this row,
 * and dispatch/towing/technician-assignment all refer back to it.
 */
export const serviceRequests = pgTable("service_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  vehicleId: uuid("vehicle_id")
    .notNull()
    .references(() => vehicles.id, { onDelete: "cascade" }),
  serviceType: serviceType("service_type").notNull(),
  status: serviceRequestStatus("status").notNull().default("CREATED"),
  issue: text("issue"),
  detail: text("detail"),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  locationLabel: text("location_label"),
  etaMinutes: integer("eta_minutes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})
