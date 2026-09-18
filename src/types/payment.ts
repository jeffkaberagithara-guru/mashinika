import type { ServiceRequestId } from "@/types/service-request"
import type { UserId } from "@/types/user"

export type PaymentId = string
export type PaymentMethodId = string

export const PAYMENT_STATUSES = [
  "PENDING",
  "AUTHORIZED",
  "PAID",
  "FAILED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
] as const
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]

export const PAYMENT_PROVIDERS = [
  "MPESA",
  "CARD",
  "BANK_TRANSFER",
  "CASH",
  "PAYPAL",
] as const
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number]

export const PAYMENT_METHODS = [
  "MPESA",
  "CARD",
  "BANK_ACCOUNT",
  "CASH",
] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const CURRENCY_CODES = ["KES", "USD"] as const
export type CurrencyCode = (typeof CURRENCY_CODES)[number]

export interface Payment {
  id: PaymentId
  customerId: UserId
  serviceRequestId: ServiceRequestId
  amounts: {
    subtotal: number
    serviceFee: number
    total: number
  }
  currency: CurrencyCode
  method: PaymentMethod
  provider: PaymentProvider
  status: PaymentStatus
  reference: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
  paidAt: string | null
}

export interface PaymentMethodCard {
  id: PaymentMethodId
  customerId: UserId
  method: PaymentMethod
  provider: PaymentProvider
  /** Masked identifier e.g. "•••• 1234" or "2547***217". */
  maskedIdentifier: string | null
  isDefault: boolean
  createdAt: string
}

export interface PaymentReceipt {
  id: string
  paymentId: PaymentId
  receiptNumber: string
  issuedAt: string
  receiptUrl: string | null
}