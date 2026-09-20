import type { VehicleId } from '@/types/vehicle'
import type { ServiceRequestId } from '@/types/service-request'
import type { TechnicianId } from '@/types/technician'

export type DiagnosticsSessionId = string
export type DiagnosticReportId = string
export type DiagnosticFaultCodeId = string

export const DIAGNOSTIC_REPORT_STATUSES = [
  'REQUESTED',
  'IN_PROGRESS',
  'READY',
  'DELIVERED',
] as const
export type DiagnosticReportStatus = (typeof DIAGNOSTIC_REPORT_STATUSES)[number]

export const DIAGNOSTICS_SESSION_STATUSES = [
  'PENDING',
  'RUNNING',
  'COMPLETED',
  'ERROR',
] as const
export type DiagnosticsSessionStatus =
  (typeof DIAGNOSTICS_SESSION_STATUSES)[number]

export interface DiagnosticsSession {
  id: DiagnosticsSessionId
  serviceRequestId: ServiceRequestId
  technicianId: TechnicianId
  vehicleId: VehicleId | null
  status: DiagnosticsSessionStatus
  startedAt: string | null
  completedAt: string | null
  createdAt: string
}

export interface DiagnosticFaultCode {
  id: DiagnosticFaultCodeId
  code: string
  description: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface DiagnosticReport {
  id: DiagnosticReportId
  sessionId: DiagnosticsSessionId
  serviceRequestId: ServiceRequestId
  vehicleId: VehicleId | null
  status: DiagnosticReportStatus
  faultCodes: DiagnosticFaultCode[]
  technicianNotes: string | null
  estimatePrice: number | null
  createdAt: string
  deliveredAt: string | null
}
