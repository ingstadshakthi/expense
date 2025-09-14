"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createExpenseType } from "@/controllers/expense-type";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";

interface Props {
  handleAddNewExpense: (type: string) => void;
}

export function ExpenseForm({ handleAddNewExpense }: Props) {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function addNewExpense(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value) return;

    handleAddNewExpense(value);
    startTransition(async () => {
      const { status, message } = await createExpenseType(value);
      if (status === 200) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  }

  return (
    <form onSubmit={addNewExpense}>
      <Input
        placeholder="Add new expense type"
        value={value}
        onChange={handleOnChange}
      />
      <Button className="mt-2 w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2Icon /> Please wait
          </>
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
}
