import Nav from "@/components/semantics/nav";
import ClientLink from "@/components/utils/client-link";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <>
      <Nav className="w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 px-4 xl:px-0">
          <ClientLink
            href="/profile"
            hideOnMatch
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
          >
            Profile
          </ClientLink>
          <ClientLink
            href="/profile/expense"
            hideOnMatch
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
          >
            Categories
          </ClientLink>
          <ClientLink
            href="/profile/payment"
            hideOnMatch
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
          >
            Payment
          </ClientLink>
        </div>
      </Nav>

      <div className="mx-auto max-w-7xl px-4 py-8 xl:px-0">
        {children}
      </div>
    </>
  );
}
