import { ArrowRight, BarChart3, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              Build better products with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                all-in-one analytics
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              The only analytics platform you need. Product analytics, session replay, feature flags, A/B testing, and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="gap-2">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Everything you need to build great products
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              All the tools you need in one platform. No more switching between multiple analytics tools.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-4">
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                <CardTitle className="mt-4">Product Analytics</CardTitle>
                <CardDescription>
                  Understand user behavior with powerful product analytics and insights.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                <CardTitle className="mt-4">Feature Flags</CardTitle>
                <CardDescription>
                  Roll out features safely with feature flags and experiments.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
                <CardTitle className="mt-4">Session Replay</CardTitle>
                <CardDescription>
                  Watch real user sessions to understand what they do and why.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 dark:text-green-400" />
                <CardTitle className="mt-4">A/B Testing</CardTitle>
                <CardDescription>
                  Run experiments and make data-driven decisions with confidence.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                Trusted by teams worldwide
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Join thousands of companies using our platform to build better products
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white p-8 dark:bg-zinc-800">
                <dt className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400">Companies</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  5,000+
                </dd>
              </div>
              <div className="flex flex-col bg-white p-8 dark:bg-zinc-800">
                <dt className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400">Events tracked</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  1B+
                </dd>
              </div>
              <div className="flex flex-col bg-white p-8 dark:bg-zinc-800">
                <dt className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400">Uptime</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  99.9%
                </dd>
              </div>
              <div className="flex flex-col bg-white p-8 dark:bg-zinc-800">
                <dt className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400">Countries</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  120+
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-zinc-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start building better products today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Join thousands of teams using our platform. No credit card required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" className="gap-2">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
