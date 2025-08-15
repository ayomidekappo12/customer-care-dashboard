"use client";

import { Button } from "@/components/ui/button";

interface SubBarProps {
  filter: "all" | "urgent" | "warning" | "info";
  setFilter: (filter: "all" | "urgent" | "warning" | "info") => void;
  getFilterCount: (type: string) => number;
}

export function SubBar({ filter, setFilter, getFilterCount }: SubBarProps) {
  return (
    <div className="space-y-4 w-full bg-white mt-2 p-2">
      <div className="flex rounded-sm justify-evenly bg-[#F9FAFB]">
        {[
          { key: "all", label: "All" },
          { key: "urgent", label: "Urgent" },
          { key: "warning", label: "Warning" },
          { key: "info", label: "Info" },
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(key as any)}
            className={`rounded-none border-b-2 cursor-pointer ${
              filter === key
                ? "border-primary bg-white hover:bg-transparent shadow-md rounded-sm text-black justify-evenly gap-6 px-20"
                : "hover:bg-[#F9FAFB]"
            }`}
          >
            {label} ({getFilterCount(key)})
          </Button>
        ))}
      </div>
    </div>
  );
}
