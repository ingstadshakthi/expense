import { AlertTriangle } from "lucide-react";

import { format } from "date-fns";
import { AddExpenseButton } from "@/components/utils/add-expense";
import { tryCatch } from "@/lib/try-catch";
import { getExpenseData } from "@/lib/expense";
import { FilterControls } from "./filterControl";
import { ExpenseContent } from "./expenseContent";
import { MultiSelectDropdown } from "@/components/utils/multi-select";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";

interface Props {
  params: Promise<{ year: string; month: string }>;
  searchParams: Promise<{ page?: string; expenseType?: string; paymentType?: string }>;
}

export default async function ExpensesPage({ params, searchParams }: Props) {
  const param = await params;
  const searchParam = await searchParams;

  const [filteredResponse, error] = await tryCatch(getExpenseData({ param, searchParam }));

  if (error) {
    logger.error(`Expense page failed: ${getErrorMessage(error)}`);
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-md">
          Failed to load expense data. Please try again later.
        </p>
      </div>
    );
  }

  const {
    year,
    month,
    records,
    totalPages,
    page,
    expenseTypes,
    paymentTypes,
    expenseTypeFilter,
    paymentTypeFilter,
  } = filteredResponse;

  return (
    <div className="space-y-6">
      <div className="my-2 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-semibold">
            {format(new Date(year, month - 1), "MMMM yyyy")}
          </h2>
          <FilterControls currentYear={year} currentMonth={month} />
          <MultiSelectDropdown
            label="Expense Type"
            options={expenseTypes.map(({ name }) => name)}
            selected={expenseTypeFilter}
            queryKey="expenseType"
          />

          <MultiSelectDropdown
            label="Payment Type"
            options={paymentTypes.map(({ name }) => name)}
            selected={paymentTypeFilter}
            queryKey="paymentType"
          />
        </div>

        <AddExpenseButton onLoadExpenseType={expenseTypes} onLoadPaymentType={paymentTypes} />
      </div>

      <ExpenseContent
        records={records}
        totalPages={totalPages}
        page={page}
        year={year}
        month={month}
        expenseTypeFilter={expenseTypeFilter}
        paymentTypeFilter={paymentTypeFilter}
        expenseTypes={expenseTypes}
        paymentTypes={paymentTypes}
      />
    </div>
  );
}
