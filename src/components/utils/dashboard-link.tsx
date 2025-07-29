"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLink() {
  const pathname = usePathname();

  return (
    <Link
      href="/dashboard"
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
      )}
    >
      Dashboard
    </Link>
  );
}
