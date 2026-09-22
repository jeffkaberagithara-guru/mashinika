'use client'

import * as React from 'react'
import { useShallow } from 'zustand/react/shallow'
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  Play,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAcademyStore, type AcademyCourse } from '@/features/academy/store'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from 'cn'

const courses: AcademyCourse[] = [
  {
    id: 'owner-101',
    title: 'Owner maintenance 101',
    track: 'Owner',
    level: 'Beginner',
    duration: '2 hrs',
    blurb:
      'Fluids, filters and the weekly 10-point check that keeps your car trouble-free.',
    lessons: [
      { id: 'o101-1', title: 'The weekly 10-point check' },
      { id: 'o101-2', title: 'Oil, coolant and brake fluid' },
      { id: 'o101-3', title: 'Battery care and terminals' },
      { id: 'o101-4', title: 'When to visit a workshop' },
    ],
  },
  {
    id: 'tyre-care',
    title: 'Tyre & wheel care',
    track: 'Owner',
    level: 'Beginner',
    duration: '1.5 hrs',
    blurb: 'Correct pressure, tread reading and safe roadside wheel changes.',
    lessons: [
      { id: 'tyre-1', title: 'Reading tread wear and pressure' },
      { id: 'tyre-2', title: 'Safe jacking and wheel removal' },
      { id: 'tyre-3', title: 'Puncture basics on Kenyan roads' },
    ],
  },
  {
    id: 'battery-rescue',
    title: 'Dead battery rescue',
    track: 'Owner',
    level: 'Beginner',
    duration: '1 hr',
    blurb:
      'Jump-starting safely, why batteries fail, and when to call a technician.',
    lessons: [
      { id: 'bat-1', title: 'Why batteries die' },
      { id: 'bat-2', title: 'Safe jump-start procedure' },
      { id: 'bat-3', title: 'Knowing when to call for help' },
    ],
  },
  {
    id: 'roadside-safety',
    title: 'Safety at the roadside',
    track: 'Safety',
    level: 'Beginner',
    duration: '1.5 hrs',
    blurb:
      'Staying safe during a breakdown on a highway or a busy Nairobi street.',
    lessons: [
      { id: 'saf-1', title: 'Hazard lights, triangles and visibility' },
      { id: 'saf-2', title: 'Moving the car to safety' },
      { id: 'saf-3', title: 'Accident-site first response' },
    ],
  },
  {
    id: 'diag-fundamentals',
    title: 'Diagnostics fundamentals',
    track: 'Technician',
    level: 'Intermediate',
    duration: '6 hrs',
    blurb:
      'Fault codes, sensors and the structured process behind mobile diagnostics.',
    lessons: [
      { id: 'diag-1', title: 'Digital dashboards and code readers' },
      { id: 'diag-2', title: 'Sensors, actuators and signals' },
      { id: 'diag-3', title: 'Writing a technician report' },
    ],
  },
  {
    id: 'cert-pathway',
    title: 'Technician certification pathway',
    track: 'Technician',
    level: 'Advanced',
    duration: '40 hrs',
    blurb:
      'The full programme that prepares you to join the Mashinika network as a certified technician.',
    lessons: [
      { id: 'cert-1', title: 'Workshop standards and tools' },
      { id: 'cert-2', title: 'Engine, braking and cooling systems' },
      { id: 'cert-3', title: 'Customer service and app workflows' },
      { id: 'cert-4', title: 'Final assessment and certification' },
    ],
  },
]

const trackTone = {
  Owner: 'primary',
  Technician: 'success',
  Safety: 'warning',
} as const

export function AcademyCatalog() {
  const enrollments = useAcademyStore(useShallow((state) => state.enrollments))
  const enroll = useAcademyStore((state) => state.enroll)
  const toggleLesson = useAcademyStore((state) => state.toggleLesson)
  const leave = useAcademyStore((state) => state.leave)

  const enrolledIds = Object.keys(enrollments)
  const enrolledCourses = courses.filter((course) => enrollments[course.id])

  function handleEnroll(course: AcademyCourse) {
    enroll(course.id)
    toast.success(`Enrolled in ${course.title}.`)
  }

  function handleContinue() {
    document
      .getElementById('academy-catalog')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleClear() {
    for (const courseId of enrolledIds) leave(courseId)
    toast.success('Learning progress cleared.')
  }

  return (
    <div className="flex flex-col gap-10">
      {enrolledIds.length > 0 ? (
        <section id="academy-catalog" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              My learning
            </h2>
            <p className="text-muted-foreground text-sm">
              Pick up where you left off — tap a lesson to mark it complete.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {enrolledCourses.map((course) => {
              const enrollment = enrollments[course.id]
              const progress = Math.round(
                (enrollment.completed.length / course.lessons.length) * 100,
              )
              const done = progress === 100
              return (
                <div
                  key={course.id}
                  className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-foreground text-sm font-semibold">
                          {course.title}
                        </h3>
                        <StatusBadge
                          tone={done ? 'success' : trackTone[course.track]}
                        >
                          {done ? 'Complete' : progress + '%'}
                        </StatusBadge>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {course.duration} · {course.level}
                      </p>
                    </div>
                  </div>

                  <div
                    className="bg-muted h-1.5 w-full overflow-hidden rounded-full"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(progress, 4)}%` }}
                    />
                  </div>

                  <ul className="flex flex-col gap-1">
                    {course.lessons.map((lesson) => {
                      const checked = enrollment.completed.includes(lesson.id)
                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => toggleLesson(course.id, lesson.id)}
                            className={cn(
                              'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors',
                              checked
                                ? 'text-muted-foreground'
                                : 'hover:bg-muted/50',
                            )}
                          >
                            <span
                              className={cn(
                                'flex size-5 shrink-0 items-center justify-center rounded-md border',
                                checked
                                  ? 'bg-success/15 border-success/40 text-success'
                                  : 'border-border text-transparent',
                              )}
                              aria-hidden="true"
                            >
                              <Check className="size-3.5" />
                            </span>
                            <span
                              className={cn(
                                'truncate text-sm',
                                checked && 'line-through',
                              )}
                            >
                              {lesson.title}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Start learning"
          description="Enrol in a course below and your progress will be saved here."
        />
      )}

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Browse courses
          </h2>
          <p className="text-muted-foreground text-sm">
            Everyone starts free; certification progress carries into the
            technician network.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const enrolled = Boolean(enrollments[course.id])
            return (
              <div
                key={course.id}
                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-subtle text-foreground ring-border flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                    <GraduationCap className="size-4.5" aria-hidden="true" />
                  </span>
                  <StatusBadge tone={trackTone[course.track]}>
                    {course.track}
                  </StatusBadge>
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                    <Clock3 className="size-3" aria-hidden="true" />
                    {course.duration} · {course.level}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground text-base font-semibold">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {course.blurb}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3">
                  <span className="text-muted-foreground text-xs">
                    {course.lessons.length} lessons
                  </span>
                  {enrolled ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleContinue}
                    >
                      <Play className="size-4" aria-hidden="true" />
                      Continue
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleEnroll(course)}>
                      Enroll free
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {enrolledIds.length > 0 ? (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear learning progress
          </Button>
        </div>
      ) : null}
    </div>
  )
}
