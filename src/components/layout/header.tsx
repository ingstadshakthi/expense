import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { auth } from "@/lib/auth";
import { UserAccount } from "../utils/user-account";
import ClientLink from "../utils/client-link";
import Image from "next/image";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/90 px-4 py-2 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-end justify-center gap-[1] text-xl font-bold text-gray-900 dark:text-white"
        >
          <Image src="/logo.png" alt="Expense Logo" width={32} height={32} priority />
          <span className="font-bold">xpensa</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ClientLink
            className="text-md font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            href="/dashboard"
            hideOnMatch
          >
            Dashboard
          </ClientLink>
          <ThemeToggle />
          <UserAccount session={session} />
        </div>
      </div>
    </header>
  );
}
