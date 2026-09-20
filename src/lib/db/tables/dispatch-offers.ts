import {
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { serviceRequests } from '@/lib/db/tables/service-requests'
import { technicians } from '@/lib/db/tables/dispatch'
import { dispatchOfferStatus } from '@/lib/db/schema'

/**
 * A technician's offer to take a specific service request. This is the
 * dispatch lane of Mashinika Rescue: one request fans out, several
 * technicians bid with an ETA and price, the dispatcher awards exactly one,
 * and the rest expire.
 */
export const dispatchOffers = pgTable(
  'dispatch_offers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    requestId: uuid('request_id')
      .notNull()
      .references(() => serviceRequests.id, { onDelete: 'cascade' }),
    technicianId: uuid('technician_id')
      .notNull()
      .references(() => technicians.id, { onDelete: 'cascade' }),
    status: dispatchOfferStatus('status').notNull().default('PENDING'),
    etaMinutes: integer('eta_minutes'),
    price: numeric('price', { precision: 12, scale: 2 }),
    message: text('message'),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('dispatch_offers_request_idx').on(table.requestId),
    index('dispatch_offers_technician_idx').on(table.technicianId),
  ],
)
