"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-4">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      {description && <p className="mb-3 text-sm text-muted">{description}</p>}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-5">{children}</CardContent>
      </Card>
    </section>
  )
}

export function UiKitApp() {
  const [progress, setProgress] = useState(60)
  const [notify, setNotify] = useState(true)

  return (
    <div className="text-primary">
      {/* Doc header */}
      <div className="border-b border-primary bg-accent/50 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧩</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">UI Kit</h1>
            <p className="text-sm text-muted">
              The shadcn/ui components bundled with adminOS. Copy them from{" "}
              <code>src/components/ui</code>.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-6">
        <Section title="Buttons" description="Variants and sizes via class-variance-authority.">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </Section>

        <Section title="Badges">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Section>

        <Section title="Form controls">
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
            <Label htmlFor="notify">Email notifications</Label>
          </div>
        </Section>

        <Section title="Progress" description="Drag the buttons to update.">
          <div className="w-full max-w-md space-y-3">
            <Progress value={progress} />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
                −10
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
                +10
              </Button>
              <span className="self-center text-sm text-muted">{progress}%</span>
            </div>
          </div>
        </Section>

        <Section title="Avatar & Separator">
          <Avatar><AvatarFallback>AO</AvatarFallback></Avatar>
          <Avatar className="bg-red/15 text-red"><AvatarFallback>MC</AvatarFallback></Avatar>
          <Avatar className="bg-blue/15 text-blue"><AvatarFallback>SP</AvatarFallback></Avatar>
          <Separator orientation="vertical" className="h-8" />
          <span className="text-sm text-muted">Divider →</span>
          <Separator className="mt-2" />
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="text-sm text-secondary">Manage your account preferences.</TabsContent>
            <TabsContent value="team" className="text-sm text-secondary">Invite and manage teammates.</TabsContent>
            <TabsContent value="billing" className="text-sm text-secondary">Update your plan and payment method.</TabsContent>
          </Tabs>
        </Section>

        <Section title="Card">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Pro plan</CardTitle>
              <CardDescription>Everything you need to scale.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$29<span className="text-base font-normal text-muted">/mo</span></div>
              <Button className="mt-4 w-full">Upgrade</Button>
            </CardContent>
          </Card>
        </Section>

        <Section title="Skeleton" description="Loading placeholders.">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        </Section>
      </div>
    </div>
  )
}
