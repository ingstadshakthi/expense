import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { auth } from "@/lib/auth";
import { getUser } from "@/controllers/user";
import { UserAccount } from "../utils/user-account";
import HeaderNav from "./header-nav";

export async function Header() {
  const [session, dbUser] = await Promise.all([auth(), getUser()]);

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 xl:px-0">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold">
          <span className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center text-sm font-black">
            E
          </span>
          <span className="text-foreground font-semibold tracking-tight">xpensa</span>
        </Link>

        {/* Center nav — only shown when signed in */}
        {session && <HeaderNav />}

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="bg-border ml-1 h-5 w-px" />
          <div className="ml-1">
            <UserAccount session={session} displayName={dbUser?.name ?? undefined} />
          </div>
        </div>
      </div>
    </header>
  );
}
