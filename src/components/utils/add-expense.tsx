"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExpenseFormDialog } from "./expense-form";
import { onExpenseCreate } from "@/controllers/expense/action";
import { ExpenseData } from "@/types/expense";
import { toast } from "sonner";
import { getUserExpensePaymentDetails } from "@/controllers/profile/action";
import { Plus } from "lucide-react";

interface ExpenseType {
  id: string;
  name: string;
}

interface PaymentType {
  id: string;
  name: string;
}

interface Props {
  onLoadExpenseType?: ExpenseType[];
  onLoadPaymentType?: PaymentType[];
}

export function AddExpenseButton({ onLoadExpenseType = [], onLoadPaymentType = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>(onLoadExpenseType);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>(onLoadPaymentType);

  async function onFormOpen() {
    if (submitting) return;
    setOpen(true); // open immediately — no button loading state

    if (onLoadExpenseType.length === 0 || onLoadPaymentType.length === 0) {
      setLoadingForm(true);
      try {
        const [expense, payment] = await getUserExpensePaymentDetails();
        setExpenseTypes(expense);
        setPaymentTypes(payment);
      } finally {
        setLoadingForm(false);
      }
    }
  }

  async function onAddExpense(data: ExpenseData) {
    setSubmitting(true);
    try {
      const { success, message } = await onExpenseCreate(data);
      if (success) {
        toast.success(message);
        setOpen(false);
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button
        onClick={onFormOpen}
        disabled={submitting}
        className="gap-1.5 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" />
        Add Expense
      </Button>
      {open && (
        <ExpenseFormDialog
          open={open}
          onOpenChange={setOpen}
          expenseTypes={expenseTypes}
          paymentTypes={paymentTypes}
          onSubmit={onAddExpense}
          isSubmitting={submitting}
          isLoadingOptions={loadingForm}
        />
      )}
    </>
  );
}
