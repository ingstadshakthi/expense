"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { Session } from "next-auth";
import { signOutAction } from "@/lib/action";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  session: Session | null;
  displayName?: string;
}

export function UserAccount({ session, displayName }: Props) {
  const router = useRouter();

  if (!session?.user?.image) {
    return (
      <Link href="/login" className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
        Sign in
      </Link>
    );
  }

  function redirectToProfile() {
    router.push("/profile");
  }

  const name = (displayName ?? session.user.name ?? "").split(" ")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium transition-colors hover:bg-secondary">
          <Image
            src={session.user.image}
            className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20"
            alt="Profile Image"
            width={28}
            height={28}
          />
          <span className="hidden sm:block">{name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={redirectToProfile} className="cursor-pointer">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOutAction} className="cursor-pointer">
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
