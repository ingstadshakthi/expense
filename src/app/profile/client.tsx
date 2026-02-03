"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
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
  const [budget, setBudget] = useState(user.budget.toString());
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [originalName, setOriginalName] = useState(user.name || "");
  const [originalBudget, setOriginalBudget] = useState(user.budget.toString());

  const hasChanges = name !== originalName || budget !== originalBudget;

  const handleSave = async () => {
    if (!hasChanges) return;

    setLoading(true);
    try {
      const budgetNum = Math.max(0, parseInt(budget) || 0);

      const result = await updateUser({
        name: name.trim() || undefined,
        budget: budgetNum,
      });

      if (result.success) {
        setOriginalName(name.trim() || "");
        setOriginalBudget(budgetNum.toString());

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
    <div className="mx-auto my-4 max-w-3xl space-y-6">
      {/* Main Card */}
      <Card>
        <div className="p-6">
          <div className="space-y-6">
            {/* Email Display */}
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <div className="bg-muted mt-2 rounded-lg px-4 py-3">
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">Email cannot be changed</p>
            </div>

            {/* Name Input */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2"
              />
            </div>

            {/* Budget Input */}
            <div>
              <Label htmlFor="budget" className="text-sm font-medium">
                Monthly Budget
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-muted-foreground">₹</span>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="flex-1"
                />
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Set your monthly spending limit. Dashboard will show your progress against this
                budget.
              </p>
            </div>

            {/* Budget Preview */}
            {budget && (
              <div className="rounded-lg border border-blue-200/50 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Monthly Budget: ₹{parseInt(budget).toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3 border-t pt-6">
            <Button onClick={handleSave} disabled={loading || !hasChanges} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
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
              <p className="text-muted-foreground flex items-center text-sm">
                You have unsaved changes
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
