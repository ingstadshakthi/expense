"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { onExpenseCreate } from "@/controllers/expense/action";
import { ExpenseData } from "@/types/expense";
import { toast } from "sonner";
import { getUserExpensePaymentDetails } from "@/controllers/profile/action";
import { Loader2 } from "lucide-react";

const ExpenseFormDialog = dynamic(() => import("./expense-form").then(m => m.ExpenseFormDialog));

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
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>(onLoadExpenseType);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>(onLoadPaymentType);

  async function onFormOpen() {
    if (loading || submitting) return; // Prevent multiple clicks

    setLoading(true);
    setOpen(true);

    startTransition(async () => {
      try {
        if (onLoadExpenseType.length === 0 || onLoadPaymentType.length === 0) {
          const [expense, payment] = await getUserExpensePaymentDetails();
          setExpenseTypes(expense);
          setPaymentTypes(payment);
        }
      } finally {
        setLoading(false);
      }
    });
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
      <Button onClick={onFormOpen} disabled={loading || submitting} className="gap-2">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Add Expense"
        )}
      </Button>
      {open && (
        <ExpenseFormDialog
          open={open}
          onOpenChange={setOpen}
          expenseTypes={expenseTypes}
          paymentTypes={paymentTypes}
          onSubmit={onAddExpense}
          isSubmitting={submitting}
        />
      )}
    </>
  );
}
