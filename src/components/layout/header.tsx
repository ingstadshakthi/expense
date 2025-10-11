import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { auth } from "@/lib/auth";
import { UserAccount } from "../utils/user-account";
import ClientLink from "../utils/client-link";
import Image from "next/image";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-border bg-background sticky top-0 w-full border-b px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-primary font-bol flex items-end justify-center gap-[1] text-xl"
        >
          <Image src="/logo.png" alt="Expense Logo" width={32} height={32} priority />
          <span className="font-bold">xpensa</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ClientLink
            className="text-md hover:text-primary text-bold font-medium transition-colors"
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
