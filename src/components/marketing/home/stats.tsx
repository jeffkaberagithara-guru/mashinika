const stats = [
  { value: '17 min', label: 'average response' },
  { value: '800+', label: 'vetted technicians' },
  { value: '45+', label: 'towns covered' },
  { value: '4.9', label: 'average customer rating' },
]

export function HomeStats() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <dl className="bg-border border-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border shadow-sm lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-background flex flex-col gap-0.5 px-5 py-5"
          >
            <dd className="text-foreground text-2xl font-semibold tracking-tight">
              {stat.value}
            </dd>
            <dt className="text-muted-foreground text-sm">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
