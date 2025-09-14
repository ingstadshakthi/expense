"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ClientLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: ReactNode;
  hideOnMatch?: boolean;
  className?: string;
  prefetch?: boolean;
}

export default function ClientLink({
  href,
  children,
  hideOnMatch,
  className,
  prefetch = false,
  ...props
}: ClientLinkProps) {
  const pathname = usePathname();

  if (hideOnMatch && pathname === href) return null;

  return (
    <Link href={href} className={className} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}
