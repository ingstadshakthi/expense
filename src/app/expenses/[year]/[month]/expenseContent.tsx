import { format } from "date-fns";
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
import { ExpenseDTO } from "@/controllers/expense/service";

interface Props {
  page: number;
  year: number;
  month: number;
  totalPages: number;
  records: ExpenseDTO[];
  expenseTypeFilter: string[];
  paymentTypeFilter: string[];
}

export function ExpenseContent(props: Props) {
  const { records, totalPages, page, year, month, expenseTypeFilter, paymentTypeFilter } = props;

  const buildHref = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNum.toString());

    if (expenseTypeFilter.length && !expenseTypeFilter.includes("All")) {
      expenseTypeFilter.forEach(type => params.append("expenseType", type));
    }

    if (paymentTypeFilter.length && !paymentTypeFilter.includes("All")) {
      paymentTypeFilter.forEach(type => params.append("paymentType", type));
    }

    return `/expenses/${year}/${month}?${params.toString()}`;
  };

  return (
    <>
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
                No matching records found 😢
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={buildHref(page - 1)} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href={buildHref(i + 1)} isActive={i + 1 === page}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href={buildHref(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
