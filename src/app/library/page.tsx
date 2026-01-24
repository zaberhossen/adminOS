import { Book, FileText, Video, Code, Download, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const documentationSections = [
  {
    id: 1,
    title: "Getting Started",
    description: "Quick start guides to get up and running in minutes",
    icon: Book,
    color: "text-blue-600 dark:text-blue-400",
    items: ["Installation", "Quick Start", "Basic Concepts", "First Project"],
  },
  {
    id: 2,
    title: "Tutorials",
    description: "Step-by-step tutorials for common use cases",
    icon: Video,
    color: "text-violet-600 dark:text-violet-400",
    items: ["Analytics Setup", "Feature Flags Guide", "Session Replay", "A/B Testing"],
  },
  {
    id: 3,
    title: "API Reference",
    description: "Complete API documentation with examples",
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    items: ["REST API", "JavaScript SDK", "Python SDK", "React SDK"],
  },
  {
    id: 4,
    title: "Resources",
    description: "Additional resources and downloadable content",
    icon: Download,
    color: "text-yellow-600 dark:text-yellow-400",
    items: ["White Papers", "Case Studies", "Templates", "Integrations"],
  },
];

const popularGuides = [
  {
    title: "Complete Analytics Implementation Guide",
    description: "Learn how to implement analytics from scratch with best practices",
    type: "Guide",
    duration: "30 min",
  },
  {
    title: "Feature Flags Architecture",
    description: "Design and implement a scalable feature flag system",
    type: "Tutorial",
    duration: "45 min",
  },
  {
    title: "Building Real-Time Dashboards",
    description: "Create real-time analytics dashboards with our API",
    type: "Workshop",
    duration: "2 hours",
  },
  {
    title: "Privacy & Compliance Best Practices",
    description: "Ensure your analytics setup is compliant with GDPR and CCPA",
    type: "Guide",
    duration: "20 min",
  },
];

export default function Library() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              Library & Documentation
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Everything you need to build, deploy, and scale with our platform. Guides, tutorials, and API references.
            </p>
            <div className="mt-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 pr-12 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-700 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <kbd className="rounded bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {documentationSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <Icon className={`h-10 w-10 ${section.color}`} />
                    <CardTitle className="mt-4 text-2xl">{section.title}</CardTitle>
                    <CardDescription className="text-base">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                          >
                            <FileText className="h-4 w-4" />
                            <span>{item}</span>
                            <ExternalLink className="ml-auto h-4 w-4" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="mt-6 w-full">
                      View all {section.title.toLowerCase()}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Popular Guides
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Most viewed guides and tutorials to help you get the most out of our platform
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-2">
            {popularGuides.map((guide, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {guide.type}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{guide.duration}</span>
                  </div>
                  <CardTitle className="mt-4">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    Start learning
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              SDKs & Integrations
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Official SDKs for your favorite languages and frameworks
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3 lg:max-w-none lg:grid-cols-6">
            {["JavaScript", "React", "Python", "Node.js", "Ruby", "Go"].map((sdk) => (
              <Card key={sdk} className="flex flex-col items-center justify-center p-6 transition-shadow hover:shadow-lg">
                <Code className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
                <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{sdk}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-zinc-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need help?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg">
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
