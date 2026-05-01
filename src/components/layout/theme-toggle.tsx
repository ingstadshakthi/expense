"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  function toggle() {
    if (resolvedTheme === "dark") setTheme("light");
    else setTheme("dark");
  }

  if (!mounted) return <div className="h-8 w-8" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground h-8 w-8"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
