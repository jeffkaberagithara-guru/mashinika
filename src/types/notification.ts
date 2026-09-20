import type { UserId } from '@/types/user'

export type NotificationId = string

export const NOTIFICATION_TYPES = [
  'SERVICE_UPDATE',
  'DISPATCH_OFFER',
  'TECHNICIAN_ASSIGNMENT',
  'PAYMENT',
  'ACADEMY',
  'SYSTEM',
] as const
export type NotificationType = (typeof NOTIFICATION_TYPES)[number]

export const NOTIFICATION_CHANNELS = ['IN_APP', 'PUSH', 'SMS', 'EMAIL'] as const
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number]

export interface Notification {
  id: NotificationId
  recipientId: UserId
  type: NotificationType
  channel: NotificationChannel
  title: string
  body: string
  read: boolean
  createdAt: string
}

export type NotificationPreferences = {
  [key in NotificationChannel]: boolean
}
