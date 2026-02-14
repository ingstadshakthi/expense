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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Short Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expense Type</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
                <TableCell>
                  {expenseTypes.find(t => t.id === expense.expenseType)?.name ||
                    expense.expenseType}
                </TableCell>
                <TableCell>{expense.paymentType}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(expense)}
                      aria-label={`Edit expense ${expense.shortName}`}
                      title="Edit expense"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(expense)}
                      aria-label={`Delete expense ${expense.shortName}`}
                      title="Delete expense"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="py-4 text-center">
                No matching records found 😢
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
            paymentType: paymentTypes.find(p => p.name === editingExpense.paymentType)?.id || "",
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
