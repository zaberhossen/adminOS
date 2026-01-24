import { ShoppingBag, Star, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Product Analytics Pro",
    description: "Advanced analytics with unlimited events and data retention",
    price: "$99/mo",
    features: ["Unlimited events", "1-year data retention", "Advanced dashboards", "Custom reports"],
    icon: TrendingUp,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    name: "Feature Flags Enterprise",
    description: "Enterprise-grade feature flag management and rollouts",
    price: "$149/mo",
    features: ["Unlimited flags", "Advanced targeting", "Gradual rollouts", "Priority support"],
    icon: Sparkles,
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    id: 3,
    name: "Session Replay Plus",
    description: "Record and replay user sessions with advanced filtering",
    price: "$79/mo",
    features: ["Unlimited recordings", "Privacy controls", "Advanced filters", "Export options"],
    icon: ShoppingBag,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: 4,
    name: "A/B Testing Suite",
    description: "Run sophisticated experiments with statistical significance",
    price: "$129/mo",
    features: ["Unlimited experiments", "Statistical engine", "Multi-variate testing", "Real-time results"],
    icon: Star,
    color: "text-green-600 dark:text-green-400",
  },
];

export default function Store() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              Products & Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <Icon className={`h-10 w-10 ${product.color}`} />
                    <CardTitle className="mt-4 text-2xl">{product.name}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{product.price}</span>
                    </div>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <svg
                              className="h-3 w-3 text-green-600 dark:text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start free trial</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Have a different question? Contact our team.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Can I switch plans later?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Do you offer discounts for startups?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes, we offer special pricing for early-stage startups. Contact our sales team for more information.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                What payment methods do you accept?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                We accept all major credit cards, PayPal, and can arrange invoicing for annual contracts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
