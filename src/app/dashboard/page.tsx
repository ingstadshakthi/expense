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

  return (
    <div className="space-y-6 mt-4">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <ClientLink href={`/expenses/${year}/${month}`}>
            <Button variant="outline">View All</Button>
          </ClientLink>
          <AddExpenseButton />
        </div>
      </div>

      {/* Top 4 Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Current Month */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {stats.monthLabel} Spent
                </p>
                <p className="mt-2 text-3xl font-bold">₹{stats.currentMonthTotal.toFixed(0)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {isIncreased ? (
                <>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {Math.abs(percentageChange).toFixed(1)}% vs last month
                  </p>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                    {Math.abs(percentageChange).toFixed(1)}% vs last month
                  </p>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Daily Average */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Daily Average</p>
                <p className="mt-2 text-3xl font-bold">₹{stats.dailyAverage.toFixed(0)}</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-xs">Per day in {stats.monthLabel}</p>
          </div>
        </Card>

        {/* Average Expense */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Avg Expense</p>
                <p className="mt-2 text-3xl font-bold">₹{stats.averageExpense.toFixed(0)}</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              {stats.transactionCount} transaction{stats.transactionCount !== 1 ? "s" : ""}
            </p>
          </div>
        </Card>

        {/* Highest Expense */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-rose-500/10 to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Highest Expense</p>
                <p className="mt-2 text-3xl font-bold">
                  ₹{stats.highestExpense?.amount.toFixed(0) || "0"}
                </p>
              </div>
            </div>
            {stats.highestExpense && (
              <p className="text-muted-foreground mt-3 truncate text-xs">
                {stats.highestExpense.name}
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Insights Row */}
      {stats.highestSpendingDay && (
        <Card className="border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">
                  Highest Spending Day
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  {format(stats.highestSpendingDay.date, "MMMM d, yyyy")} • ₹
                  {stats.highestSpendingDay.amount.toFixed(0)} ({stats.highestSpendingDay.count}{" "}
                  transaction{stats.highestSpendingDay.count !== 1 ? "s" : ""})
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Main Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Spending by Category - 2 columns with colored bars */}
        <Card className="lg:col-span-2">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Spending by Category</h2>
            <div className="mt-6 space-y-5">
              {stats.categoryBreakdown.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">No spending data</p>
              ) : (
                stats.categoryBreakdown.map(category => (
                  <div key={category.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm font-semibold">₹{category.amount.toFixed(0)}</span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                          opacity: 0.8,
                        }}
                      ></div>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {category.percentage.toFixed(1)}% of total • {category.count} transaction
                      {category.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Insights Summary - 1 column */}
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <h3 className="mb-4 font-semibold">Top Categories</h3>
              <div className="space-y-3">
                {stats.topCategories.length === 0 ? (
                  <p className="text-muted-foreground py-4 text-center text-sm">No data</p>
                ) : (
                  stats.topCategories.map((category, index) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="flex h-6 w-6 items-center justify-center p-0 text-xs font-bold">
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium">{category.name}</p>
                          <p className="text-muted-foreground text-xs">
                            ₹{category.amount.toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          {stats.highestExpense && (
            <Card className="border-red-200/50 bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:border-red-900/30 dark:from-red-950/20 dark:to-rose-950/20">
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-red-900 dark:text-red-100">
                      TOP EXPENSE
                    </p>
                    <p className="mt-1 text-sm font-semibold text-red-900 dark:text-red-100">
                      ₹{stats.highestExpense.amount.toFixed(0)}
                    </p>
                    <p className="text-muted-foreground mt-1 truncate text-xs">
                      {stats.highestExpense.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{stats.highestExpense.category}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Expenses Table */}
      <Card>
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Expenses</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                      No recent expenses
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.recentExpenses.map(expense => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.shortName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-transparent"
                          style={{
                            backgroundColor: expense.categoryColor + "20",
                            color: expense.categoryColor,
                          }}
                        >
                          {expense.categoryName}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(expense.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{expense.amount.toFixed(0)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
