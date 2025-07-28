"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-border bg-background px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-primary">
          Expense
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
