"use client";

import { cn } from "@/lib/utils";

export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex animate-gradient-text bg-gradient-to-r from-blue-400 via-amber-300 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
