"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen } from "lucide-react";

interface Props {
  year: number;
  month: number;
}

export default function HeaderNav({ year, month }: Props) {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard"),
    },
    {
      href: `/expenses/${year}/${month}`,
      label: "Ledger",
      icon: BookOpen,
      active: pathname.startsWith("/expenses"),
    },
  ];

  return (
    <nav className="flex items-center gap-0.5">
      {links.map(({ href, label, icon: Icon, active }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
            active
              ? "bg-primary/8 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
