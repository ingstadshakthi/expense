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
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  session: Session | null;
}

export function UserAccount({ session }: Props) {
  const router = useRouter();

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

  function redirectToProfile() {
    router.push("/profile");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <h3 className="flex items-center gap-1 md:gap-2">
          <Image
            src={session.user.image}
            className="h-8 rounded-full"
            alt="Profile Image"
            width={32}
            height={32}
          />
          <span>{session.user.name?.split(" ")[0]}</span>
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={redirectToProfile}
          className="cursor-pointer"
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOutAction} className="cursor-pointer">
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
