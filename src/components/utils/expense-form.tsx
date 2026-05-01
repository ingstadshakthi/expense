"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ExpenseType {
  id: string;
  name: string;
}

interface PaymentType {
  id: string;
  name: string;
}

interface ExpenseData {
  id?: string;
  shortName: string;
  description?: string;
  amount: number;
  expenseType: string;
  paymentType: string;
  date: Date;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenseTypes: ExpenseType[];
  paymentTypes: PaymentType[];
  initialData?: ExpenseData;
  onSubmit: (data: ExpenseData) => Promise<void>;
  isSubmitting?: boolean;
  isLoadingOptions?: boolean;
}

export function ExpenseFormDialog({
  open,
  onOpenChange,
  expenseTypes,
  paymentTypes,
  initialData,
  onSubmit,
  isSubmitting = false,
  isLoadingOptions = false,
}: Props) {
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (initialData) {
      setShortName(initialData.shortName || "");
      setDescription(initialData.description || "");
      setAmount(initialData.amount?.toString() || "");
      setExpenseType(initialData.expenseType || "");
      setPaymentType(initialData.paymentType || "");
      setDate(initialData.date ? new Date(initialData.date) : new Date());
    } else {
      setShortName("");
      setDescription("");
      setAmount("");
      setExpenseType("");
      setPaymentType("");
      setDate(new Date());
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting || isSubmitting) return; // Prevent double submission

    if (!shortName.trim()) {
      toast.error("Short name is required");
      return;
    }
    if (!amount || isNaN(Number(amount))) {
      toast.error("Valid amount is required");
      return;
    }
    if (!expenseType) {
      toast.error("Select an expense type");
      return;
    }
    if (!paymentType) {
      toast.error("Select a payment type");
      return;
    }
    if (!date) {
      toast.error("Select a date");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        id: initialData?.id,
        shortName,
        description: description.trim() || undefined,
        amount: Number(amount),
        expenseType,
        paymentType,
        date,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="text-base font-semibold">
            {initialData ? "Edit Expense" : "Add Expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Short Name */}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="shortName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Expense Name
              </Label>
              <Input
                id="shortName"
                value={shortName}
                onChange={e => setShortName(e.target.value)}
                placeholder="e.g. Lunch, Uber ride"
                className="h-10 rounded-lg border-border bg-secondary/30 focus-visible:ring-primary"
                required
              />
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="amount" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-10 rounded-lg border-border bg-secondary/30 focus-visible:ring-primary"
                required
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </Label>
              <Select>
                <SelectTrigger className="h-10 rounded-lg border-border bg-secondary/30 focus-visible:ring-primary [&>svg:last-child]:hidden">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(date, "MMM d, yyyy")}</span>
                </SelectTrigger>
                <SelectContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate: Date | undefined) => {
                      if (selectedDate) setDate(selectedDate);
                    }}
                    disabled={(date: Date) => date > new Date()}
                    required
                  />
                </SelectContent>
              </Select>
            </div>

            {/* Expense Type */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </Label>
              {isLoadingOptions ? (
                <div className="h-10 animate-pulse bg-secondary" />
              ) : (
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger className="h-10 rounded-lg border-border bg-secondary/30 focus-visible:ring-primary">
                  <SelectValue placeholder="Select category" className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  {expenseTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              )}
            </div>

            {/* Payment Type */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payment
              </Label>
              {isLoadingOptions ? (
                <div className="h-10 animate-pulse bg-secondary" />
              ) : (
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger className="h-10 rounded-lg border-border bg-secondary/30 focus-visible:ring-primary">
                  <SelectValue placeholder="Select payment" className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              )}
            </div>

            {/* Description */}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description <span className="normal-case font-normal text-muted-foreground/60">(optional)</span>
              </Label>
              <Input
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Any notes about this expense"
                className="h-10 rounded-lg border-border bg-secondary/30 focus-visible:ring-primary"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || isSubmitting}
              className="h-10 gap-2 rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {submitting || isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : initialData ? (
                "Update Expense"
              ) : (
                "Add Expense"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
