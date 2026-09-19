import {
  doublePrecision,
  index,
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { profiles, technicianSpecialty, technicianStatus } from "@/lib/db/schema"

/**
 * A technician in the Mashinika Rescue pool. `id` doubles as the auth/profile
 * id (1:1), and `status` + `specialties` drive who receives dispatch offers.
 * Offers fan out from `service_requests` and land against these rows.
 */
export const technicians = pgTable(
  "technicians",
  {
    id: uuid("id")
      .primaryKey()
      .references(() => profiles.id, { onDelete: "cascade" }),
    status: technicianStatus("status").notNull().default("AVAILABLE"),
    specialties: technicianSpecialty("specialties").array().notNull(),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
    completedJobs: integer("completed_jobs").notNull().default(0),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("technicians_status_idx").on(table.status)],
)