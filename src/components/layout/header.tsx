import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { auth } from "@/lib/auth";
import { getUser } from "@/controllers/user";
import { UserAccount } from "../utils/user-account";
import HeaderNav from "./header-nav";

export async function Header() {
  const [session, dbUser] = await Promise.all([auth(), getUser()]);
  const now = new Date();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 xl:px-0">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold shrink-0">
          <span className="flex h-7 w-7 items-center justify-center bg-primary text-sm font-black text-primary-foreground">
            E
          </span>
          <span className="font-semibold tracking-tight text-foreground">xpensa</span>
        </Link>

        {/* Center nav — only shown when signed in */}
        {session && (
          <HeaderNav
            year={now.getFullYear()}
            month={now.getMonth() + 1}
          />
        )}

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="ml-1 h-5 w-px bg-border" />
          <div className="ml-1">
            <UserAccount session={session} displayName={dbUser?.name ?? undefined} />
          </div>
        </div>
      </div>
    </header>
  );
}
