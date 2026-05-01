"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/controllers/user";
import { revalidateProfilePage } from "./actions";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface ProfileClientProps {
  user: {
    id?: string;
    name: string | null;
    email: string | null;
    image: string | null;
    budget: number;
  };
}

export function ProfileClient({ user }: ProfileClientProps) {
  const [name, setName] = useState(user.name || "");
  const [budget, setBudget] = useState(
    user.budget > 0 ? user.budget.toLocaleString("en-IN") : ""
  );
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [originalName, setOriginalName] = useState(user.name || "");
  const [originalBudget, setOriginalBudget] = useState(
    user.budget > 0 ? user.budget.toLocaleString("en-IN") : ""
  );

  const parseBudget = (val: string) => parseInt(val.replace(/,/g, ""), 10) || 0;
  const hasChanges = name !== originalName || budget !== originalBudget;

  function handleBudgetChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw === "") { setBudget(""); return; }
    const num = parseInt(raw, 10);
    setBudget(num.toLocaleString("en-IN"));
  }

  const handleSave = async () => {
    if (!hasChanges) return;

    setLoading(true);
    try {
      const budgetNum = Math.max(0, parseBudget(budget));

      const result = await updateUser({
        name: name.trim() || undefined,
        budget: budgetNum,
      });

      if (result.success) {
        const formatted = budgetNum > 0 ? budgetNum.toLocaleString("en-IN") : "";
        setOriginalName(name.trim() || "");
        setOriginalBudget(formatted);
        setBudget(formatted);

        setSaved(true);
        toast.success(result.message);

        await revalidateProfilePage();
      } else {
        toast.error(result.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Account</p>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
      </div>

      {/* Main Card */}
      <div className="border border-border bg-card p-6 space-y-6">

        {/* Email */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </Label>
          <div className="bg-secondary/60 px-4 py-3">
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <p className="text-xs text-muted-foreground/60">Email cannot be changed</p>
        </div>

        <div className="h-px bg-border" />

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Display Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
            className="border-border bg-secondary/30 focus-visible:ring-primary"
          />
        </div>

        <div className="h-px bg-border" />

        {/* Budget */}
        <div className="space-y-1.5">
          <Label htmlFor="budget" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Monthly Budget
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">₹</span>
            <Input
              id="budget"
              type="text"
              inputMode="numeric"
              value={budget}
              onChange={handleBudgetChange}
              placeholder="0"
              className="flex-1 border-border bg-secondary/30 focus-visible:ring-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground/60">
            Set your monthly spending limit. Dashboard will track your progress.
          </p>
        </div>

        {/* Budget Preview */}
        {budget && parseBudget(budget) > 0 && (
          <div className="border border-primary/20 bg-primary/6 px-4 py-3">
            <p className="text-sm font-semibold text-primary">
              Monthly Budget: ₹{parseBudget(budget).toLocaleString("en-IN")}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <Button
            onClick={handleSave}
            disabled={loading || !hasChanges}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : saved ? (
              <>
                <Check className="h-4 w-4" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          {hasChanges && !saved && (
            <p className="text-sm text-muted-foreground">You have unsaved changes</p>
          )}
        </div>
      </div>
    </div>
  );
}
