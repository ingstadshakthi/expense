"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { onExpenseCreate } from "@/controllers/expense/action";
import { ExpenseData } from "@/types/expense";
import { toast } from "sonner";
import { getUserExpensePaymentDetails } from "@/controllers/profile/action";

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
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>(onLoadExpenseType);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>(onLoadPaymentType);

  async function onFormOpen() {
    setOpen(true);
    startTransition(async () => {
      if (onLoadExpenseType.length === 0 || onLoadPaymentType.length === 0) {
        const [expense, payment] = await getUserExpensePaymentDetails();
        setExpenseTypes(expense);
        setPaymentTypes(payment);
      }
    });
  }

  async function onAddExpense(data: ExpenseData) {
    const { success, message } = await onExpenseCreate(data);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  return (
    <>
      <Button onClick={onFormOpen}>Add Expense</Button>
      {open && (
        <ExpenseFormDialog
          open={open}
          onOpenChange={setOpen}
          expenseTypes={expenseTypes}
          paymentTypes={paymentTypes}
          onSubmit={onAddExpense}
        />
      )}
    </>
  );
}
