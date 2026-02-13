"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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

const Dialog = dynamic(() => import("@/components/ui/dialog").then(m => m.Dialog));
const DialogContent = dynamic(() => import("@/components/ui/dialog").then(m => m.DialogContent));
const DialogHeader = dynamic(() => import("@/components/ui/dialog").then(m => m.DialogHeader));
const DialogTitle = dynamic(() => import("@/components/ui/dialog").then(m => m.DialogTitle));
const DialogFooter = dynamic(() => import("@/components/ui/dialog").then(m => m.DialogFooter));

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
}

export function ExpenseFormDialog({
  open,
  onOpenChange,
  expenseTypes,
  paymentTypes,
  initialData,
  onSubmit,
  isSubmitting = false,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Expense" : "Add Expense"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Short Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="shortName">Expense Short Name</Label>
            <Input
              id="shortName"
              value={shortName}
              onChange={e => setShortName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Select>
              <SelectTrigger className="[&>svg:last-child]:hidden">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "MMMM d, yyyy")}
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
          <div className="flex flex-col gap-2">
            <Label>Expense Type</Label>
            <Select value={expenseType} onValueChange={setExpenseType}>
              <SelectTrigger>
                <SelectValue placeholder="Select expense type" />
              </SelectTrigger>
              <SelectContent>
                {expenseTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Type */}
          <div className="flex flex-col gap-2">
            <Label>Payment Type</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={submitting || isSubmitting} className="gap-2">
              {submitting || isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
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
