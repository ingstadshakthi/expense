import { getExpensesByMonth } from "@/controllers/expense/action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { AddExpenseButton } from "@/components/utils/add-expense";

function validateYearMonth(yearParam: string, monthParam: string) {
  const year = Number(yearParam);
  const month = Number(monthParam);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2000 ||
    year > new Date().getFullYear() + 1 || // allow current +1 year max
    month < 1 ||
    month > 12
  ) {
    throw new Error("Invalid year or month in URL");
  }

  return { year, month };
}

export default async function ExpensesPage({
  params,
  searchParams,
}: {
  params: Promise<{ year: string; month: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const { year, month } = validateYearMonth(param.year, param.month);

  const page = Number(searchParam.page) || 1;
  const limit = 25;

  const { records, totalPages } = await getExpensesByMonth(year, month, page, limit);

  return (
    <div className="space-y-6">
      <div className="my-2 flex justify-between">
        <h2 className="text-2xl font-semibold">
          Expenses for {format(new Date(year, month - 1), "MMMM yyyy")}
        </h2>
        <AddExpenseButton />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Short Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expense Type</TableHead>
            <TableHead>Payment Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map(expense => (
              <TableRow key={expense.id}>
                <TableCell>{format(new Date(expense.date), "dd MMM yyyy, hh:mm a")}</TableCell>
                <TableCell>{expense.shortName}</TableCell>
                <TableCell>{expense.description || "-"}</TableCell>
                <TableCell>₹{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.expenseType}</TableCell>
                <TableCell>{expense.paymentType}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-4 text-center">
                No expenses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/expenses/${year}/${month}?page=${page - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`/expenses/${year}/${month}?page=${i + 1}`}
                  isActive={i + 1 === page}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/expenses/${year}/${month}?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
