import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Building Better Product Analytics: A Complete Guide",
    excerpt: "Learn how to implement product analytics that actually helps you make better decisions and understand your users.",
    author: "Sarah Chen",
    date: "Jan 20, 2024",
    readTime: "8 min read",
    category: "Product",
    image: "🎯",
  },
  {
    id: 2,
    title: "Feature Flags Best Practices for 2024",
    excerpt: "Discover the latest best practices for implementing feature flags in your application and avoiding common pitfalls.",
    author: "Michael Roberts",
    date: "Jan 18, 2024",
    readTime: "6 min read",
    category: "Engineering",
    image: "🚀",
  },
  {
    id: 3,
    title: "How to Use Session Replay to Improve UX",
    excerpt: "Session replay can reveal critical UX issues. Here's how to use it effectively without overwhelming your team.",
    author: "Emma Wilson",
    date: "Jan 15, 2024",
    readTime: "10 min read",
    category: "Design",
    image: "🎨",
  },
  {
    id: 4,
    title: "A/B Testing Statistical Significance Explained",
    excerpt: "Understanding statistical significance is crucial for running meaningful experiments. We break it down in simple terms.",
    author: "David Kim",
    date: "Jan 12, 2024",
    readTime: "12 min read",
    category: "Data Science",
    image: "📊",
  },
  {
    id: 5,
    title: "Privacy-First Analytics: What You Need to Know",
    excerpt: "With increasing privacy regulations, here's how to build analytics that respect user privacy while remaining useful.",
    author: "Lisa Anderson",
    date: "Jan 10, 2024",
    readTime: "7 min read",
    category: "Privacy",
    image: "🔒",
  },
  {
    id: 6,
    title: "Scaling Product Analytics to Billions of Events",
    excerpt: "Learn how we scaled our analytics infrastructure to handle billions of events per day while maintaining performance.",
    author: "Tom Garcia",
    date: "Jan 8, 2024",
    readTime: "15 min read",
    category: "Engineering",
    image: "⚡",
  },
];

const categories = ["All", "Product", "Engineering", "Design", "Data Science", "Privacy"];

export default function Blog() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              Blog & Insights
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Latest articles, tutorials, and insights on product analytics, engineering, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto py-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-violet-50 text-6xl dark:from-blue-950 dark:to-violet-950">
                    {post.image}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Tag className="h-4 w-4" />
                    <span>{post.category}</span>
                  </div>
                  <CardTitle className="mt-2 line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{post.author}</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="w-full gap-2">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Get the latest articles and insights delivered to your inbox every week.
            </p>
            <div className="mt-10 flex gap-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-700 sm:text-sm sm:leading-6"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
