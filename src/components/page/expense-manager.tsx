"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import { ColorPicker } from "@/components/ui/color-picker";
import { onExpenseTypeDelete, onExpenseTypeUpsert } from "@/controllers/profile/action";
import { useAlertDialog } from "@/hooks/alert-dialog";
import { useLoader } from "../providers/loader-provider";
import { logger } from "@/lib/logger";
import { ExpenseType } from "@/controllers/profile/type";

interface Props {
  expenseTypes: ExpenseType[];
}

export function ExpenseManager({ expenseTypes }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#f87171");
  const [selected, setSelected] = useState<string | undefined>();
  const { openAlert } = useAlertDialog();
  const { showLoader, hideLoader } = useLoader();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    if (selected) {
      async function onConfirm() {
        showLoader();
        const { success, message } = await onExpenseTypeUpsert({ name, color }, selected);
        logger.info(message);
        if (success) {
          toast(message);
        } else {
          toast.error(message);
        }
        hideLoader();
      }
      openAlert({
        title: "Are you Sure?",
        message: `This action cannot be undone. This operation will update all the expenses related to ${name}`,
        onConfirm,
        onCancel: () => console.log("cancelled"),
      });
    } else {
      await onExpenseTypeUpsert({ name, color });
    }
    setName("");
    setColor("#f87171");
    setSelected(undefined);
  };

  function handleDelete(id: string) {
    async function onConfirm() {
      showLoader();
      const { success, message } = await onExpenseTypeDelete(id);
      logger.info(message);
      if (success) {
        toast(message);
      } else {
        toast.error(message);
      }
      hideLoader();
    }

    openAlert({
      title: "Are you Sure?",
      message: `This action cannot be undone. This operation will delete all the expenses related to ${name}`,
      onConfirm,
      onCancel: () => console.log("cancelled"),
    });
  }

  const handleEdit = (expense: ExpenseType) => {
    setName(expense.name);
    setColor(expense.color);
    setSelected(expense.id);
  };

  return (
    <div className="mx-auto mt-20 max-w-lg px-4">
      <div className="mb-4 flex flex-wrap gap-3" role="list">
        {expenseTypes.map(exp => (
          <div
            role="listitem"
            key={exp.id}
            style={{ backgroundColor: exp.color }}
            className="flex items-center px-3 py-1"
          >
            {/* Edit Button */}
            <button
              type="button"
              onClick={() => handleEdit(exp)}
              aria-label={`Edit expense type ${exp.name}`}
              className="flex cursor-pointer items-center px-2 py-1 focus:ring-offset-1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:outline-none"
            >
              <span className="text-white">{exp.name}</span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDelete(exp.id)}
              aria-label={`Delete expense type ${exp.name}`}
              className="ml-1 p-1 text-white hover:text-red-200 focus:ring-offset-1 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0 focus-visible:outline-none"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <Label>Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Color</Label>
          <ColorPicker value={color} onChange={setColor} />
        </div>

        <Button type="submit">{selected ? "Update" : "Add"} Expense</Button>
      </form>
    </div>
  );
}
