import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddExpenseButton } from "@/components/utils/add-expense";
import ClientLink from "@/components/utils/client-link";
import { getDashboardData } from "@/controllers/dashboard/service";
import { TrendingUp, TrendingDown, AlertCircle, Zap } from "lucide-react";
import { format } from "date-fns";

export default async function Dashboard() {
  const stats = await getDashboardData();

  if (!stats) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Unable to load dashboard data</p>
      </div>
    );
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const percentageChange =
    stats.lastMonthTotal === 0
      ? 0
      : ((stats.currentMonthTotal - stats.lastMonthTotal) / stats.lastMonthTotal) * 100;
  const isIncreased = percentageChange > 0;

  // Mastermind Insights Logic
  const insights = [];
  if (stats.budget > 0) {
    if (stats.budgetPercentage > 100) {
      insights.push({
        title: "Budget Exceeded",
        description: `You've spent ₹${(stats.budgetUsed - stats.budget).toLocaleString("en-IN")} over your budget.`,
        type: "danger",
      });
    } else if (stats.budgetPercentage > 85) {
      insights.push({
        title: "Critical Budget",
        description: `Only ₹${stats.budgetRemaining.toLocaleString("en-IN")} remains.`,
        type: "warning",
      });
    }
  }

  if (isIncreased && percentageChange > 15) {
    insights.push({
      title: "Spending Surge",
      description: `${percentageChange.toFixed(0)}% month-over-month increase.`,
      type: "info",
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 xl:px-0">
      {/* Premium Header Section */}
      <section className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Financial Pulse</p>
          <h1 className="text-gradient text-4xl font-extrabold tracking-tighter sm:text-5xl">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <ClientLink href={`/expenses/${year}/${month}`}>
            <Button variant="outline" className="h-11 rounded-xl px-6 font-bold shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-900">
              View Ledger
            </Button>
          </ClientLink>
          <div className="relative group">
            <div className="glow-blue" />
            <AddExpenseButton />
          </div>
        </div>
      </section>

      {/* Dynamic Mastermind Insights - Floating Glass */}
      {insights.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`glass flex items-center gap-3 rounded-2xl px-5 py-3 transition-all hover:scale-[1.02] ${insight.type === "danger" ? "border-red-500/20 bg-red-500/5" :
                insight.type === "warning" ? "border-amber-500/20 bg-amber-500/5" :
                  "border-blue-500/20 bg-blue-500/5"
                }`}
            >
              <Zap className={`h-4 w-4 ${insight.type === "danger" ? "text-red-500" :
                insight.type === "warning" ? "text-amber-500" :
                  "text-blue-500"
                }`} />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="text-sm font-black uppercase tracking-wider">{insight.title}</span>
                <span className="text-sm opacity-70">{insight.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Impact Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Monthly Spend */}
        <div className="premium-card group relative overflow-hidden p-8">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-600/5 blur-2xl group-hover:bg-blue-600/10 transition-colors" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stats.monthLabel} Total</p>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl font-light text-muted-foreground/40">₹</span>
            <span className="tab-nums text-5xl font-black tracking-tighter">
              {stats.currentMonthTotal.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
            </span>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-black ${isIncreased ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"
              }`}>
              {isIncreased ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(percentageChange).toFixed(1)}%
            </div>
            <span className="text-[9px] font-bold uppercase text-muted-foreground/40 tracking-wider">vs Last Month</span>
          </div>
        </div>

        {/* Daily Velocity */}
        <div className="premium-card group relative p-8">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-600/5 blur-2xl transition-colors" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Daily Velocity</p>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl font-light text-muted-foreground/40">₹</span>
            <span className="tab-nums text-5xl font-black tracking-tighter">
              {stats.dailyAverage.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
            </span>
          </div>
          <p className="mt-8 text-[9px] font-bold uppercase text-muted-foreground/40 tracking-wider">Spending speed</p>
        </div>

        {/* Budget Health */}
        <div className={`premium-card p-8 transition-colors ${stats.budget > 0 && stats.budgetPercentage > 90 ? "bg-red-500/[0.02]" : "bg-emerald-500/[0.02]"
          }`}>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
            {stats.budget > 0 ? "Budget Fuel" : "Avg. Load"}
          </p>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl font-light text-muted-foreground/40">₹</span>
            <span className={`tab-nums text-5xl font-black tracking-tighter ${stats.budget > 0 && stats.budgetRemaining <= 0 ? "text-red-600" : ""
              }`}>
              {(stats.budget > 0 ? stats.budgetRemaining : stats.averageExpense).toLocaleString("en-IN", { minimumFractionDigits: 0 })}
            </span>
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${stats.budgetPercentage > 100 ? "bg-red-500" : stats.budgetPercentage > 80 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                style={{ width: `${Math.min(stats.budgetPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
              <span className="text-muted-foreground/60">Utilized</span>
              <span>{stats.budgetPercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Highest Impact Transaction */}
        <div className="premium-card p-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Peak Expense</p>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl font-light text-muted-foreground/40">₹</span>
            <span className="tab-nums text-5xl font-black tracking-tighter">
              {(stats.highestExpense?.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 0 })}
            </span>
          </div>
          <div className="mt-8 flex items-center gap-2 truncate">
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="truncate text-[10px] font-bold uppercase text-muted-foreground tracking-tight">
              {stats.highestExpense?.name || "No large items"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 mt-12">
        {/* Category breakdown Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter">Segmented Spend</h2>
            <div className="h-px flex-1 mx-6 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Distribution</span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {stats.categoryBreakdown.length === 0 ? (
              <div className="col-span-full py-20 text-center opacity-40">No segments identified.</div>
            ) : (
              stats.categoryBreakdown.map((category) => (
                <div key={category.id} className="group flex flex-col gap-3">
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-wide text-muted-foreground/60">{category.name}</span>
                      <span className="tab-nums text-2xl font-black tracking-tighter">₹{category.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <span className="text-[10px] font-black opacity-30">{category.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/20">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                        boxShadow: `0 0 15px ${category.color}40`
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Feed Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter text-gradient">Activity</h2>
          </div>

          <div className="space-y-4">
            {stats.recentExpenses.map((expense) => (
              <div key={expense.id} className="premium-card group relative p-4 hover:scale-[1.01] bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-black text-white shadow-lg transition-transform group-hover:rotate-6"
                    style={{ backgroundColor: expense.categoryColor, boxShadow: `0 8px 16px ${expense.categoryColor}40` }}
                  >
                    {expense.shortName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black tracking-tight">{expense.shortName}</p>
                    <p className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">
                      {expense.categoryName} • {format(new Date(expense.date), "MMM d")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tab-nums text-sm font-black tracking-tighter">₹{expense.amount.toLocaleString("en-IN")}</p>
                    <div className="mt-1 flex justify-end">
                      <div className="h-1 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {stats.highestSpendingDay && (
            <div className="glass p-6 rounded-3xl space-y-4 border-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-amber-500 fill-current" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-500/80">Activity Peak</span>
              </div>
              <p className="text-3xl font-black tracking-tighter">₹{stats.highestSpendingDay.amount.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground font-medium">
                Peak reached on <span className="font-bold text-foreground">{format(stats.highestSpendingDay.date, "MMMM do")}</span> with {stats.highestSpendingDay.count} items.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
