"use client";

import { cn } from "@/lib/utils";

export function DotPattern({ className, ...props }) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-200/60",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
}
