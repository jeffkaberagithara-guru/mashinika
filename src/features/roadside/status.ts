import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  AlertTriangle,
  CircleCheck,
  CircleX,
  MapPin,
  MapPinCheck,
  Navigation,
  Radar,
  Stethoscope,
  Truck,
  UserCheck,
  Wrench,
} from 'lucide-react'
import type { ServiceRequestStatus } from '@/types/service-request'

export type { ServiceRequestStatus }
export { SERVICE_REQUEST_STATUSES } from '@/types/service-request'

/** Tones map onto the design-system status badge tones. */
export type StatusTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'primary'

export type ServiceRequestStatusConfig = {
  label: string
  shortLabel: string
  tone: StatusTone
  description: string
}

export const SERVICE_REQUEST_STATUS_CONFIG: Record<
  ServiceRequestStatus,
  ServiceRequestStatusConfig
> = {
  CREATED: {
    label: 'Request received',
    shortLabel: 'Created',
    tone: 'neutral',
    description: 'Your request has been received.',
  },
  LOCATION_CONFIRMED: {
    label: 'Location confirmed',
    shortLabel: 'Location confirmed',
    tone: 'info',
    description: 'Your pickup location has been confirmed.',
  },
  SEARCHING_FOR_TECHNICIAN: {
    label: 'Finding a technician',
    shortLabel: 'Finding technician',
    tone: 'warning',
    description: 'We are matching you with the nearest available technician.',
  },
  TECHNICIAN_ASSIGNED: {
    label: 'Technician assigned',
    shortLabel: 'Assigned',
    tone: 'info',
    description: 'A technician has accepted your request.',
  },
  TECHNICIAN_EN_ROUTE: {
    label: 'Technician en route',
    shortLabel: 'En route',
    tone: 'primary',
    description: 'Your technician is on the way to you.',
  },
  TECHNICIAN_ARRIVED: {
    label: 'Technician arrived',
    shortLabel: 'Arrived',
    tone: 'primary',
    description: 'Your technician has arrived at your location.',
  },
  DIAGNOSING: {
    label: 'Diagnosing the issue',
    shortLabel: 'Diagnosing',
    tone: 'primary',
    description: 'Your technician is diagnosing the vehicle.',
  },
  REPAIRING: {
    label: 'Repair in progress',
    shortLabel: 'Repairing',
    tone: 'primary',
    description: 'Your technician is carrying out repairs.',
  },
  TOW_REQUIRED: {
    label: 'Towing recommended',
    shortLabel: 'Tow required',
    tone: 'warning',
    description: 'The technician has recommended towing to a workshop.',
  },
  TOWING: {
    label: 'Towing in progress',
    shortLabel: 'Towing',
    tone: 'primary',
    description: 'Your vehicle is being towed to the destination.',
  },
  COMPLETED: {
    label: 'Completed',
    shortLabel: 'Completed',
    tone: 'success',
    description: 'Your service request has been completed.',
  },
  CANCELLED: {
    label: 'Cancelled',
    shortLabel: 'Cancelled',
    tone: 'danger',
    description: 'This request has been cancelled.',
  },
}

/** Icon hint for a state when rendered inside a timeline. */
export const SERVICE_REQUEST_STATUS_ICONS: Record<
  ServiceRequestStatus,
  LucideIcon
> = {
  CREATED: AlertCircle,
  LOCATION_CONFIRMED: MapPin,
  SEARCHING_FOR_TECHNICIAN: Radar,
  TECHNICIAN_ASSIGNED: UserCheck,
  TECHNICIAN_EN_ROUTE: Navigation,
  TECHNICIAN_ARRIVED: MapPinCheck,
  DIAGNOSING: Stethoscope,
  REPAIRING: Wrench,
  TOW_REQUIRED: AlertTriangle,
  TOWING: Truck,
  COMPLETED: CircleCheck,
  CANCELLED: CircleX,
}
