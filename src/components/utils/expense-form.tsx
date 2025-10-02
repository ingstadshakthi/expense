"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  date: Date; // new field
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenseTypes: ExpenseType[];
  paymentTypes: PaymentType[];
  initialData?: ExpenseData;
  onSubmit: (data: ExpenseData) => Promise<void>;
}

export function ExpenseFormDialog({
  open,
  onOpenChange,
  expenseTypes,
  paymentTypes,
  initialData,
  onSubmit,
}: Props) {
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

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

    await onSubmit({
      id: initialData?.id,
      shortName,
      description: description.trim() || undefined,
      amount: Number(amount),
      expenseType,
      paymentType,
      date,
    });

    onOpenChange(false);
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={day => day > new Date()} // ✅ block future dates
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
            <Button type="submit">{initialData ? "Update Expense" : "Add Expense"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
