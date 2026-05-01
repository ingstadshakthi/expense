import { Button } from "@/components/ui/button";
import { AddExpenseButton } from "@/components/utils/add-expense";
import ClientLink from "@/components/utils/client-link";
import { getDashboardData } from "@/controllers/dashboard/service";
import { getUserExpensePaymentDetails } from "@/controllers/profile/action";
import { DashboardFilters, TodayButton } from "@/components/page/dashboard-filters";
import { DonutChart } from "@/components/page/donut-chart";
import { TrendingUp, TrendingDown, Zap, AlertCircle, Info } from "lucide-react";
import { format } from "date-fns";

interface Props {
  searchParams: Promise<{ year?: string; month?: string }>;
}

export default async function Dashboard({ searchParams }: Props) {
  const params = await searchParams;
  const now = new Date();
  const year = params.year ? parseInt(params.year) : now.getFullYear();
  const month = params.month ? parseInt(params.month) : now.getMonth() + 1;

  const [stats, [expenseTypes, paymentTypes]] = await Promise.all([
    getDashboardData(year, month),
    getUserExpensePaymentDetails(),
  ]);

  if (!stats) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Unable to load dashboard data</p>
      </div>
    );
  }

  const percentageChange =
    stats.lastMonthTotal === 0
      ? 0
      : ((stats.currentMonthTotal - stats.lastMonthTotal) / stats.lastMonthTotal) * 100;
  const isIncreased = percentageChange > 0;

  const insights: { title: string; description: string; type: "danger" | "warning" | "info" }[] = [];
  if (stats.budget > 0) {
    if (stats.budgetPercentage > 100) {
      insights.push({
        title: "Budget Exceeded",
        description: `₹${(stats.budgetUsed - stats.budget).toLocaleString("en-IN")} over budget.`,
        type: "danger",
      });
    } else if (stats.budgetPercentage > 85) {
      insights.push({
        title: "Budget Warning",
        description: `Only ₹${stats.budgetRemaining.toLocaleString("en-IN")} left.`,
        type: "warning",
      });
    }
  }
  if (isIncreased && percentageChange > 15) {
    insights.push({
      title: "Spending Surge",
      description: `+${percentageChange.toFixed(0)}% vs last month.`,
      type: "info",
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 xl:px-0">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            Financial Overview
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Dashboard</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <TodayButton year={year} month={month} />
          <DashboardFilters year={year} month={month} />
          <ClientLink href={`/expenses/${year}/${month}`}>
            <Button variant="outline" className="h-9 border-border px-4 text-sm font-medium hover:bg-secondary">
              View Ledger
            </Button>
          </ClientLink>
          <AddExpenseButton onLoadExpenseType={expenseTypes} onLoadPaymentType={paymentTypes} />
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 border px-4 py-2.5 text-sm ${
                insight.type === "danger"
                  ? "border-red-500/30 bg-red-500/6 text-red-600 dark:text-red-400"
                  : insight.type === "warning"
                  ? "border-orange-500/30 bg-orange-500/6 text-orange-600 dark:text-orange-400"
                  : "border-blue-500/30 bg-blue-500/6 text-blue-600 dark:text-blue-400"
              }`}
            >
              {insight.type === "danger" ? (
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
              ) : insight.type === "warning" ? (
                <Zap className="h-3.5 w-3.5 flex-shrink-0" />
              ) : (
                <Info className="h-3.5 w-3.5 flex-shrink-0" />
              )}
              <span className="font-semibold">{insight.title}:</span>
              <span className="opacity-80">{insight.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stat Cards — flush grid with gap-px */}
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">

        <div className="stat-card p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {stats.monthLabel} Total
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-lg font-light text-muted-foreground/50">₹</span>
            <span className="tab-nums text-3xl font-black tracking-tight">
              {stats.currentMonthTotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold ${
              isIncreased ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            }`}>
              {isIncreased ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(percentageChange).toFixed(1)}%
            </div>
            <span className="text-[10px] text-muted-foreground/50">vs last month</span>
          </div>
        </div>

        <div className="stat-card p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Daily Average
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-lg font-light text-muted-foreground/50">₹</span>
            <span className="tab-nums text-3xl font-black tracking-tight">
              {stats.dailyAverage.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-4 text-[10px] font-medium text-muted-foreground/50">
            {stats.transactionCount} transactions
          </p>
        </div>

        <div className="stat-card p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {stats.budget > 0 ? "Budget Remaining" : "Avg. per Expense"}
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-lg font-light text-muted-foreground/50">₹</span>
            <span className={`tab-nums text-3xl font-black tracking-tight ${stats.budget > 0 && stats.budgetRemaining <= 0 ? "text-red-500" : ""}`}>
              {(stats.budget > 0 ? stats.budgetRemaining : stats.averageExpense).toLocaleString("en-IN")}
            </span>
          </div>
          {stats.budget > 0 && (
            <div className="mt-4 space-y-1">
              <div className="h-1 w-full bg-secondary">
                <div
                  className={`h-full transition-all duration-700 ${stats.budgetPercentage > 100 ? "bg-red-500" : stats.budgetPercentage > 80 ? "bg-orange-500" : "bg-emerald-500"}`}
                  style={{ width: `${Math.min(stats.budgetPercentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground/50">
                <span>Used</span>
                <span className="font-semibold">{stats.budgetPercentage.toFixed(0)}%</span>
              </div>
            </div>
          )}
        </div>

        <div className="stat-card p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Largest Expense
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-lg font-light text-muted-foreground/50">₹</span>
            <span className="tab-nums text-3xl font-black tracking-tight">
              {(stats.highestExpense?.amount || 0).toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-4 truncate text-[10px] font-medium text-muted-foreground/50">
            {stats.highestExpense?.name || "No expenses yet"}
          </p>
        </div>
      </div>

      {/* Lower section */}
      <div className="grid gap-8 lg:grid-cols-12">

        {/* Left: Donut + Breakdown */}
        <div className="lg:col-span-7 space-y-6">

          {stats.categoryBreakdown.length > 0 ? (
            <>
              <div className="border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em]">Spend by Category</h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                    {stats.monthLabel} {year}
                  </span>
                </div>
                <div className="p-6">
                  <DonutChart
                    segments={stats.categoryBreakdown}
                    total={stats.currentMonthTotal}
                    label={stats.monthLabel}
                  />
                </div>
              </div>

              <div className="border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em]">Category Breakdown</h2>
                </div>
                <div className="space-y-4 p-6">
                  {stats.categoryBreakdown.map(category => (
                    <div key={category.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2" style={{ backgroundColor: category.color }} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="tab-nums text-sm font-bold">
                            ₹{category.amount.toLocaleString("en-IN")}
                          </span>
                          <span className="w-8 text-right text-[10px] font-bold text-muted-foreground/40">
                            {category.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-secondary">
                        <div
                          className="h-full transition-all duration-700 ease-out"
                          style={{ width: `${category.percentage}%`, backgroundColor: category.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="border border-border bg-card">
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em]">Spend by Category</h2>
              </div>
              <div className="flex items-center justify-center py-20 text-sm text-muted-foreground/40">
                No expenses this month yet.
              </div>
            </div>
          )}
        </div>

        {/* Right: Activity */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em]">Recent Activity</h2>
              <ClientLink href={`/expenses/${year}/${month}`}>
                <span className="cursor-pointer text-[11px] font-semibold text-primary transition-colors hover:text-primary/80">
                  View all →
                </span>
              </ClientLink>
            </div>

            <div className="divide-y divide-border">
              {stats.recentExpenses.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground/40">No activity yet.</p>
              ) : (
                stats.recentExpenses.map(expense => (
                  <div
                    key={expense.id}
                    className="flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-secondary/30"
                  >
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: expense.categoryColor }}
                    >
                      {expense.shortName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{expense.shortName}</p>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">
                        {expense.categoryName} · {format(new Date(expense.date), "MMM d")}
                      </p>
                    </div>
                    <p className="tab-nums flex-shrink-0 text-sm font-bold">
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {stats.highestSpendingDay && (
            <div className="border border-primary/20 bg-primary/4 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                  Peak Spending Day
                </span>
              </div>
              <p className="tab-nums text-2xl font-black tracking-tight">
                ₹{stats.highestSpendingDay.amount.toLocaleString("en-IN")}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {format(stats.highestSpendingDay.date, "MMMM do")} ·{" "}
                <span className="font-semibold text-foreground">
                  {stats.highestSpendingDay.count}{" "}
                  {stats.highestSpendingDay.count === 1 ? "transaction" : "transactions"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
