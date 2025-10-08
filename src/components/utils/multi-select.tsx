"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  options: string[];
  selected: string[];
  queryKey: string; // 👈 example: "expenseType" or "paymentType"
}

export function MultiSelectDropdown({ label, options, selected, queryKey }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleSelect(option: string) {
    let newSelected: string[];

    if (option === "All") {
      newSelected = ["All"];
    } else {
      if (selected.includes("All")) {
        newSelected = [option];
      } else if (selected.includes(option)) {
        newSelected = selected.filter(o => o !== option);
        if (newSelected.length === 0) newSelected = ["All"];
      } else {
        newSelected = [...selected, option];
      }
    }

    // update URL
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.includes("All")) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, newSelected.join(","));
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      setOpen(false);
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={isPending}
          className="min-w-[160px] justify-between px-3"
        >
          <span className="truncate">
            {selected.includes("All") ? `${label}: All` : `${label}: ${selected.length} selected`}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem
                key="All"
                onSelect={() => handleSelect("All")}
                className="flex items-center gap-2"
              >
                <Checkbox checked={selected.includes("All")} />
                <span>All</span>
              </CommandItem>
              {options.map(option => (
                <CommandItem
                  key={option}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center gap-2"
                >
                  <Checkbox checked={selected.includes(option)} />
                  <span>{option}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
