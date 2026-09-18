import { sql } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

import { ACADEMY_COURSE_LEVELS } from "@/types/academy"
import { ACADEMY_ENROLLMENT_STATUSES } from "@/types/academy"
import { DIAGNOSTIC_REPORT_STATUSES } from "@/types/diagnostics"
import { DISPATCH_OFFER_STATUSES } from "@/types/dispatch"
import { FLEET_SERVICE_CATEGORIES } from "@/types/fleet"
import { MAINTENANCE_SCHEDULE_INTERVALS } from "@/types/fleet"
import { FUEL_TYPES } from "@/types/vehicle"
import { VEHICLE_TYPES } from "@/types/vehicle"

import { SERVICE_REQUEST_STATUSES } from "@/types/service-request"
import { SERVICE_TYPES } from "@/types/service-request"
import { TECHNICIAN_SPECIALTIES } from "@/types/technician"
import { TECHNICIAN_STATUSES } from "@/types/technician"
import { USER_ROLES } from "@/types/user"

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const userRole = pgEnum("user_role", [...USER_ROLES])
export const fuelType = pgEnum("fuel_type", [...FUEL_TYPES])
export const vehicleType = pgEnum("vehicle_type", [...VEHICLE_TYPES])

export const serviceType = pgEnum("service_type", [...SERVICE_TYPES])
export const serviceRequestStatus = pgEnum("service_request_status", [
  ...SERVICE_REQUEST_STATUSES,
])
export const dispatchOfferStatus = pgEnum("dispatch_offer_status", [
  ...DISPATCH_OFFER_STATUSES,
])

export const technicianSpecialty = pgEnum("technician_specialty", [
  ...TECHNICIAN_SPECIALTIES,
])
export const technicianStatus = pgEnum("technician_status", [
  ...TECHNICIAN_STATUSES,
])

export const diagnosticReportStatus = pgEnum("diagnostic_report_status", [
  ...DIAGNOSTIC_REPORT_STATUSES,
])
export const academyCourseLevel = pgEnum("academy_course_level", [
  ...ACADEMY_COURSE_LEVELS,
])
export const academyEnrollmentStatus = pgEnum("academy_enrollment_status", [
  ...ACADEMY_ENROLLMENT_STATUSES,
])
export const fleetServiceCategory = pgEnum("fleet_service_category", [
  ...FLEET_SERVICE_CATEGORIES,
])
export const maintenanceScheduleInterval = pgEnum(
  "maintenance_schedule_interval",
  [...MAINTENANCE_SCHEDULE_INTERVALS],
)

// ---------------------------------------------------------------------------
// Shared IDs
// ---------------------------------------------------------------------------

/**
 * Profiles map 1:1 onto `auth.users`. Roles are multi-valued because a
 * single person can be both a CUSTOMER and a TECHNICIAN (e.g. a roadside
 * technician whose own car breaks down).
 */
export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey(),
    phone: text("phone").notNull().unique(),
    email: text("email").unique(),
    displayName: text("display_name"),
    roles: userRole("roles").array().notNull().default(sql`'{CUSTOMER}'`),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("profiles_roles_idx").using("gin", table.roles),
  ],
)