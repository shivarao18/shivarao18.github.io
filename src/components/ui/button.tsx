import type { AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline: "border border-border bg-card text-foreground hover:border-accent hover:text-accent",
        ghost: "text-foreground hover:bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant }), className)} {...props} />;
}
