import type { UserId } from "@/types/user"
import type { VehicleId } from "@/types/vehicle"
import type { TechnicianId } from "@/types/technician"

export type AcademyCourseId = string
export type AcademyModuleId = string
export type AcademyLessonId = string
export type AcademyEnrollmentId = string

export const ACADEMY_COURSE_LEVELS = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
] as const
export type AcademyCourseLevel = (typeof ACADEMY_COURSE_LEVELS)[number]

export const ACADEMY_ENROLLMENT_STATUSES = [
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "DROPPED",
] as const
export type AcademyEnrollmentStatus = (typeof ACADEMY_ENROLLMENT_STATUSES)[number]

export interface AcademyCourse {
  id: AcademyCourseId
  title: string
  slug: string
  level: AcademyCourseLevel
  description: string | null
  authorId: UserId
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface AcademyModule {
  id: AcademyModuleId
  courseId: AcademyCourseId
  title: string
  position: number
}

export interface AcademyLesson {
  id: AcademyLessonId
  moduleId: AcademyModuleId
  title: string
  minutes: number
  position: number
}

export interface AcademyEnrollment {
  id: AcademyEnrollmentId
  courseId: AcademyCourseId
  studentId: UserId
  status: AcademyEnrollmentStatus
  progressPct: number
  enrolledAt: string
}

export interface LessonProgress {
  lessonId: AcademyLessonId
  studentId: UserId
  completed: boolean
  completedAt: string | null
}

export type AcademyReference = {
  type: "COURSE"
  id: AcademyCourseId
} | {
  type: "TECHNICIAN"
  id: TechnicianId
} | {
  type: "VEHICLE"
  id: VehicleId
}