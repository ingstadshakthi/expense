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
import { signOut } from "@/lib/auth";
import { signOutAction } from "@/lib/action";

interface Props {
  session: Session | null;
}

export function UserAccount({ session }: Props) {
  if (!session?.user?.image) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Signin
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <h3 className="flex items-center gap-1 md:gap-2">
          <img src={session.user.image} className="h-8 rounded-full" />
          <span>{session.user.name?.split(" ")[0]}</span>
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={signOutAction} className="cursor-pointer">
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
