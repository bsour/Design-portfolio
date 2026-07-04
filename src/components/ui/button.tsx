import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "bg-ink text-paper hover:bg-forest",
        clay: "bg-clay text-paper hover:bg-[#a2451b]",
        outline:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
        ghost: "text-ink hover:text-clay",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8 text-[0.95rem]",
        sm: "h-10 px-5 text-[0.8rem]",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
