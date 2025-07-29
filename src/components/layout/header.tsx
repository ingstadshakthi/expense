import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { DashboardLink } from "../utils/dashboard-link";
import { auth } from "@/lib/auth";
import { UserAccount } from "../utils/user-account";

export async function Header() {
  const session = await auth();

  return (
    <header className="w-full border-b border-border bg-background px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-primary">
          Expense
        </Link>

        <div className="flex items-center space-x-4">
          <DashboardLink />
          <ThemeToggle />
          <UserAccount session={session} />
        </div>
      </div>
    </header>
  );
}
