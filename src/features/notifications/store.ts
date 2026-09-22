'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppNotificationKind = 'rescue' | 'quote' | 'system'

export type AppNotification = {
  id: string
  kind: AppNotificationKind
  title: string
  body: string
  href?: string
  createdAt: string
  read: boolean
}

export type AppNotificationInput = Omit<
  AppNotification,
  'id' | 'createdAt' | 'read'
>

type NotificationsStore = {
  items: AppNotification[]
  notify: (input: AppNotificationInput) => void
  markRead: (id: string) => void
  markAllRead: () => void
  dismiss: (id: string) => void
  clear: () => void
}

const MAX_ITEMS = 30

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set) => ({
      items: [],
      notify: (input) =>
        set((state) => {
          const entry: AppNotification = {
            ...input,
            id: `notif-${crypto.randomUUID()}`,
            createdAt: new Date().toISOString(),
            read: false,
          }
          return { items: [entry, ...state.items].slice(0, MAX_ITEMS) }
        }),
      markRead: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, read: true } : item,
          ),
        })),
      markAllRead: () =>
        set((state) => ({
          items: state.items.map((item) => ({ ...item, read: true })),
        })),
      dismiss: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'mashinika:notifications' },
  ),
)
