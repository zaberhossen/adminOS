"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Status = "active" | "invited" | "suspended"

const USERS: { name: string; email: string; role: string; status: Status; initials: string }[] = [
  { name: "Maya Chen", email: "maya@acme.io", role: "Owner", status: "active", initials: "MC" },
  { name: "Liam Wright", email: "liam@acme.io", role: "Admin", status: "active", initials: "LW" },
  { name: "Sofia Park", email: "sofia@acme.io", role: "Developer", status: "active", initials: "SP" },
  { name: "Noah Idris", email: "noah@acme.io", role: "Billing", status: "invited", initials: "NI" },
  { name: "Ava Romero", email: "ava@acme.io", role: "Support", status: "suspended", initials: "AR" },
  { name: "Ethan Cole", email: "ethan@acme.io", role: "Developer", status: "active", initials: "EC" },
  { name: "Priya Nair", email: "priya@acme.io", role: "Analyst", status: "invited", initials: "PN" },
]

const STATUS_VARIANT: Record<Status, "success" | "warning" | "destructive"> = {
  active: "success",
  invited: "warning",
  suspended: "destructive",
}

export function UsersApp() {
  const [query, setQuery] = useState("")
  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.role.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="p-6 text-primary">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted">{filtered.length} of {USERS.length} members</p>
        </div>
        <Button size="sm">
          <Plus className="size-4" /> Invite user
        </Button>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members…"
          className="pl-8"
        />
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback>{u.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{u.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-300">{u.role}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[u.status]} className="capitalize">
                    {u.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-sm text-muted">
                  No members match “{query}”.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
