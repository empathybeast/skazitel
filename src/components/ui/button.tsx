import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold tracking-wide transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jambalaya disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        seal:
          "bg-jambalaya text-cream shadow-[inset_0_1px_0_rgba(188,168,123,0.35),0_2px_0_rgba(0,0,0,0.25)] hover:bg-oxblood-deep",
        page:
          "bg-transparent text-ink border border-ink/25 hover:border-ink/55 hover:bg-ink/[0.04]",
        ghost: "bg-transparent text-ink-soft hover:text-ink hover:bg-ink/[0.05]",
      },
      size: {
        default: "h-11 px-5 text-base",
        sm: "h-10 px-3.5 text-sm",
        lg: "h-12 px-6 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "seal",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
