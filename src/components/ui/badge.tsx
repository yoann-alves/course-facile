import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        secondary: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        outline: "text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants }; 