"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const LINE = [20, 35, 28, 45, 40, 60, 55, 72, 68, 85, 80, 96]

function Sparkline({ data, color = "var(--color-red)" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - ((d - min) / range) * 100
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const SOURCES = [
  { label: "Organic search", pct: 42 },
  { label: "Direct", pct: 28 },
  { label: "Referral", pct: 18 },
  { label: "Social", pct: 12 },
]

export function AnalyticsApp() {
  return (
    <div className="p-6 text-primary">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted">Last 12 weeks</p>
        </div>
        <Badge variant="outline">Updated just now</Badge>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Page views</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">182,940</div>
                <Sparkline data={LINE} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Avg. session</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3m 41s</div>
                <Sparkline data={[...LINE].reverse()} color="var(--color-blue)" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader><CardTitle>Traffic sources</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {SOURCES.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-sm">{s.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="h-full rounded-full bg-red" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-sm tabular-nums text-zinc-500 dark:text-zinc-400">{s.pct}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention">
          <Card>
            <CardHeader><CardTitle>Weekly retention cohort</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const intensity = Math.max(0.08, 1 - (i % 6) * 0.16 - Math.floor(i / 6) * 0.05)
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={{ backgroundColor: `rgba(245, 78, 0, ${intensity.toFixed(2)})` }}
                      title={`${Math.round(intensity * 100)}%`}
                    />
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-muted">Darker = higher retention. Rows are cohorts, columns are weeks.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
