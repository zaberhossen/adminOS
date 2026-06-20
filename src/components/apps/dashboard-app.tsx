"use client"

import { ArrowDownRight, ArrowUpRight, Users, DollarSign, Activity, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "Revenue", value: "$48,210", delta: 12.5, up: true, icon: DollarSign },
  { label: "Active Users", value: "2,318", delta: 8.1, up: true, icon: Users },
  { label: "Sessions", value: "14.2k", delta: -3.2, up: false, icon: Activity },
  { label: "Conversions", value: "3.6%", delta: 1.4, up: true, icon: CreditCard },
]

const ACTIVITY = [
  { name: "Maya Chen", action: "approved an invoice", time: "2m", initials: "MC" },
  { name: "Liam Wright", action: "added 3 team members", time: "18m", initials: "LW" },
  { name: "Sofia Park", action: "deployed to production", time: "1h", initials: "SP" },
  { name: "Noah Idris", action: "updated billing plan", time: "3h", initials: "NI" },
]

const BARS = [42, 58, 35, 70, 64, 88, 52, 76, 60, 95, 48, 82]

export function DashboardApp() {
  return (
    <div className="p-6 text-primary">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted">Overview of your workspace this month.</p>
        </div>
        <Badge variant="success">● Live</Badge>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {s.label}
              </CardTitle>
              <s.icon className="size-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs font-medium",
                  s.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                )}
              >
                {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(s.delta)}% vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + activity */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-44 items-end gap-2">
              {BARS.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-zinc-900 transition-all hover:bg-orange dark:bg-zinc-100"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-zinc-400">{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ACTIVITY.map((a, i) => (
              <div key={a.name}>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback>{a.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 text-sm">
                    <span className="font-medium">{a.name}</span>{" "}
                    <span className="text-zinc-500 dark:text-zinc-400">{a.action}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{a.time}</span>
                </div>
                {i < ACTIVITY.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Goals */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Quarterly goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "New revenue", pct: 72 },
            { label: "Churn reduction", pct: 45 },
            { label: "Feature adoption", pct: 88 },
          ].map((g) => (
            <div key={g.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{g.label}</span>
                <span className="text-zinc-500 dark:text-zinc-400">{g.pct}%</span>
              </div>
              <Progress value={g.pct} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
