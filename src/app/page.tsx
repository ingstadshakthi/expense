import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Wallet,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Visual Insights",
    description: "Beautiful charts that reveal exactly where every rupee goes — at a glance.",
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    border: "border-violet-500/20",
  },
  {
    icon: Zap,
    title: "Instant Logging",
    description: "Add expenses in seconds. No friction, no forms — just fast, smart entry.",
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    icon: TrendingDown,
    title: "Spending Trends",
    description: "Spot patterns over weeks and months so you can cut waste and save more.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your financial data stays yours. End-to-end encrypted and never shared.",
    gradient: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-400",
    border: "border-sky-500/20",
  },
];

const stats = [
  { value: "₹0", label: "Cost to start" },
  { value: "< 5s", label: "To log an expense" },
  { value: "100%", label: "Private & secure" },
  { value: "∞", label: "Expenses tracked" },
];

export default async function Home() {
  const session = await auth();
  const ctaLink = session ? "/dashboard" : "/login";

  return (
    <div className="relative min-h-[calc(100vh-53px)] w-full overflow-x-hidden bg-[#0a0a0f]">
      {/* ── Ambient gradient orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-700/10 blur-[90px]" />
      </div>

      {/* ── Subtle grid texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-24 pb-32 text-center">
        {/* ── Badge ── */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          Smart expense tracking — built for India
        </div>

        {/* ── Hero headline ── */}
        <h1 className="mb-6 max-w-3xl text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Know exactly{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            where your money{" "}
          </span>
          goes.
        </h1>

        {/* ── Sub-heading ── */}
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-400 sm:text-xl">
          Expensa turns messy spending into clear, actionable insights — so you spend smarter and
          save more every single month.
        </p>

        {/* ── CTA buttons ── */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-4">
          <Link href={ctaLink}>
            <Button
              size="lg"
              className="group relative h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/40"
            >
              Get Started — It&apos;s Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>

          {!session && (
            <Link href="/login">
              <Button
                size="lg"
                variant="ghost"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-8 text-base font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* ── Stats bar ── */}
        <div className="mb-24 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(s => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/5 py-5 backdrop-blur-sm"
            >
              <span className="text-2xl font-bold text-white">{s.value}</span>
              <span className="mt-1 text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Section label ── */}
        <p className="mb-8 text-xs tracking-[0.2em] text-gray-600 uppercase">Everything you need</p>

        {/* ── Feature cards ── */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, gradient, iconColor, border }) => (
            <div
              key={title}
              className={`group relative flex flex-col gap-4 rounded-2xl border ${border} bg-gradient-to-br ${gradient} p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/8">
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom trust line ── */}
        <div className="mt-20 flex items-center gap-2 text-sm text-gray-600">
          <Wallet className="h-4 w-4" />
          <span>No credit card required · Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
