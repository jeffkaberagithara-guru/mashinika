'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AcademyCourse = {
  id: string
  title: string
  track: 'Owner' | 'Technician' | 'Safety'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  blurb: string
  lessons: { id: string; title: string }[]
}

export type AcademyEnrollment = {
  courseId: string
  enrolledAt: string
  completed: string[]
}

type AcademyStore = {
  enrollments: Record<string, AcademyEnrollment>
  enroll: (courseId: string) => void
  toggleLesson: (courseId: string, lessonId: string) => void
  leave: (courseId: string) => void
}

export const useAcademyStore = create<AcademyStore>()(
  persist(
    (set) => ({
      enrollments: {},
      enroll: (courseId) =>
        set((state) => {
          if (state.enrollments[courseId]) return state
          return {
            enrollments: {
              ...state.enrollments,
              [courseId]: {
                courseId,
                enrolledAt: new Date().toISOString(),
                completed: [],
              },
            },
          }
        }),
      toggleLesson: (courseId, lessonId) =>
        set((state) => {
          const enrollment = state.enrollments[courseId]
          if (!enrollment) return state
          const completed = enrollment.completed.includes(lessonId)
            ? enrollment.completed.filter((id) => id !== lessonId)
            : [...enrollment.completed, lessonId]
          return {
            enrollments: {
              ...state.enrollments,
              [courseId]: { ...enrollment, completed },
            },
          }
        }),
      leave: (courseId) =>
        set((state) => {
          const rest: Record<string, AcademyEnrollment> = {}
          for (const key of Object.keys(state.enrollments)) {
            if (key !== courseId) rest[key] = state.enrollments[key]
          }
          return { enrollments: rest }
        }),
    }),
    { name: 'mashinika:academy' },
  ),
)
