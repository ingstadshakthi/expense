import Nav from "@/components/semantics/nav";
import ClientLink from "@/components/utils/client-link";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <>
      <Nav className="w-full h-13 items-center text-bold text-md flex justify-end gap-8 border-b">
        <ClientLink href="/profile" hideOnMatch>
          Profile
        </ClientLink>
        <ClientLink href="/profile/expense" hideOnMatch>
          Expense
        </ClientLink>
        <ClientLink href="/profile/payment" hideOnMatch>
          Payment
        </ClientLink>
      </Nav>

      {children}
    </>
  );
}
