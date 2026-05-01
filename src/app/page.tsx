import Link from "next/link";
import { auth } from "@/lib/auth";
import { ArrowRight, BarChart3, ShieldCheck, Zap, TrendingDown } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Visual Insights",
    description: "Charts that reveal exactly where every rupee goes — at a glance.",
  },
  {
    icon: Zap,
    title: "Instant Logging",
    description: "Add expenses in seconds with a clean, friction-free form.",
  },
  {
    icon: TrendingDown,
    title: "Spending Trends",
    description: "Spot patterns over months so you can cut waste and save more.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your financial data stays yours. Authenticated and never shared.",
  },
];

export default async function Home() {
  const session = await auth();
  const ctaLink = session ? "/dashboard" : "/login";

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/6 px-4 py-1.5 text-sm font-medium text-primary">
          Smart expense tracking - built for India
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Know exactly where
          <br />
          <span className="text-primary">your money goes.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Expensa turns messy spending into clear, actionable insights - so you spend smarter every month.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={ctaLink}
            className="group inline-flex h-11 items-center gap-2 bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started - It&apos;s Free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {!session && (
            <Link
              href="/login"
              className="inline-flex h-11 items-center border border-border px-7 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Sign In
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-2 xl:px-0">
        <div className="grid grid-cols-2 divide-x divide-y divide-border border border-border bg-card sm:grid-cols-4 sm:divide-y-0">
          {[
            { value: "₹0", label: "Cost to start" },
            { value: "< 5s", label: "To log an expense" },
            { value: "100%", label: "Private & secure" },
            { value: "∞", label: "Expenses tracked" },
          ].map(s => (
            <div key={s.label} className="px-8 py-8 text-center">
              <p className="tab-nums text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20 xl:px-0">
        <p className="mb-10 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Everything you need
        </p>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-card p-8">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center bg-primary/10">
                <Icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center xl:px-0">
          <h2 className="mb-3 text-2xl font-extrabold">Ready to take control?</h2>
          <p className="mb-8 text-muted-foreground">No credit card required. Start tracking in seconds.</p>
          <Link
            href={ctaLink}
            className="inline-flex h-11 items-center gap-2 bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
