import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("eyebrow inline-flex items-center gap-3", className)}
      {...props}
    >
      <span className="h-px w-8 bg-clay" />
      {children}
    </span>
  );
}
