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
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Manage</p>
        <h1 className="text-2xl font-bold tracking-tight">Expense Categories</h1>
        <p className="text-sm text-muted-foreground">Add, edit or remove your expense categories.</p>
      </div>

      {/* Existing Tags */}
      {expenseTypes.length > 0 && (
        <div className="border border-border bg-card p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Active Categories ({expenseTypes.length})
          </p>
          <div className="flex flex-wrap gap-2" role="list">
            {expenseTypes.map(exp => (
              <div
                role="listitem"
                key={exp.id}
                className="group flex items-center gap-1 overflow-hidden border border-transparent transition-all hover:border-border hover:shadow-sm"
                style={{ backgroundColor: exp.color + "22" }}
              >
                <button
                  type="button"
                  onClick={() => handleEdit(exp)}
                  aria-label={`Edit expense type ${exp.name}`}
                  className="flex cursor-pointer items-center gap-2 px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: exp.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: exp.color }}>
                    {exp.name}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id)}
                  aria-label={`Delete expense type ${exp.name}`}
                  className="flex items-center px-2 py-1.5 text-muted-foreground/40 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Form */}
      <div className="border border-border bg-card p-5 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {selected ? "Edit Category" : "New Category"}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Name
            </Label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Food, Transport, Entertainment"
              className="border-border bg-secondary/30 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Color
            </Label>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {selected ? "Update Category" : "Add Category"}
            </Button>
            {selected && (
              <Button
                type="button"
                variant="outline"
                onClick={() => { setSelected(undefined); setName(""); setColor("#f87171"); }}
                className="rounded-xl"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
