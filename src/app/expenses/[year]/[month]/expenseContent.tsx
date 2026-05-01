"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { ExpenseFormDialog } from "@/components/utils/expense-form";
import { ExpenseDTO } from "@/controllers/expense/service";
import { ExpenseData } from "@/types/expense";
import { onExpenseDelete, onExpenseUpdate } from "@/controllers/expense/action";
import { useAlertDialog } from "@/hooks/alert-dialog";
import { useLoader } from "@/components/providers/loader-provider";

interface Props {
  page: number;
  year: number;
  month: number;
  totalPages: number;
  records: ExpenseDTO[];
  expenseTypeFilter: string[];
  paymentTypeFilter: string[];
  expenseTypes?: Array<{ id: string; name: string }>;
  paymentTypes?: Array<{ id: string; name: string }>;
}

export function ExpenseContent(props: Props) {
  const {
    records,
    totalPages,
    page,
    year,
    month,
    expenseTypeFilter,
    paymentTypeFilter,
    expenseTypes = [],
    paymentTypes = [],
  } = props;
  const [editingExpense, setEditingExpense] = useState<ExpenseDTO | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openAlert } = useAlertDialog();
  const { showLoader, hideLoader } = useLoader();

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

  const handleEdit = (expense: ExpenseDTO) => {
    setEditingExpense(expense);
    setIsEditOpen(true);
  };

  const handleDelete = (expense: ExpenseDTO) => {
    async function onConfirm() {
      showLoader();
      try {
        const { success, message } = await onExpenseDelete(expense.id);
        if (success) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      } finally {
        hideLoader();
      }
    }

    openAlert({
      title: "Delete Expense",
      message: `Are you sure you want to delete "${expense.shortName}"? This action cannot be undone.`,
      onConfirm,
      onCancel: () => console.log("Delete cancelled"),
    });
  };

  const handleEditSubmit = async (data: ExpenseData) => {
    if (!editingExpense) return;

    setIsSubmitting(true);
    try {
      const { success, message } = await onExpenseUpdate(editingExpense.id, data);
      if (success) {
        toast.success(message);
        setIsEditOpen(false);
        setEditingExpense(null);
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="overflow-hidden border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amount</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Payment</TableHead>
              <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map(expense => (
                <TableRow
                  key={expense.id}
                  className="group border-border transition-colors hover:bg-secondary/30"
                >
                  <TableCell className="text-xs text-muted-foreground">
                    {format(new Date(expense.date), "dd MMM yyyy")}
                    <span className="block text-[10px] text-muted-foreground/50">
                      {format(new Date(expense.date), "hh:mm a")}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{expense.shortName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {expense.description || <span className="text-muted-foreground/30">—</span>}
                  </TableCell>
                  <TableCell className="tab-nums font-bold text-foreground">
                    ₹{expense.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center border border-border px-2 py-0.5 text-xs font-medium">
                      {expenseTypes.find(t => t.id === expense.expenseType)?.name ?? expense.expenseType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center border border-border px-2 py-0.5 text-xs font-medium">
                      {paymentTypes.find(t => t.id === expense.paymentType)?.name ?? "—"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(expense)}
                        aria-label={`Edit expense ${expense.shortName}`}
                        className="h-7 w-7 p-0 hover:bg-blue-500/10 hover:text-blue-500"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(expense)}
                        aria-label={`Delete expense ${expense.shortName}`}
                        className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-16 text-center text-muted-foreground/40">
                  No expenses found for this period.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingExpense && (
        <ExpenseFormDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          initialData={{
            id: editingExpense.id,
            shortName: editingExpense.shortName,
            description: editingExpense.description,
            amount: editingExpense.amount,
            expenseType: editingExpense.expenseType,
            paymentType: editingExpense.paymentType,
            date: new Date(editingExpense.date),
          }}
          expenseTypes={expenseTypes}
          paymentTypes={paymentTypes}
          onSubmit={handleEditSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={buildHref(page - 1)} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={buildHref(i + 1)}
                  isActive={i + 1 === page}
                  className={i + 1 === page ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                >
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
