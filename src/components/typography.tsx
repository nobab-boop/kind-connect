import type { ElementType, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Typography scale for CreatorVault.
 * Consistent hierarchy — use these instead of raw heading tags in feature code.
 */

type TypoProps<T extends ElementType> = HTMLAttributes<HTMLElement> & {
  as?: T;
  children: ReactNode;
};

function make(defaultClass: string, defaultTag: ElementType) {
  return function Component({ as, className, children, ...rest }: TypoProps<ElementType>) {
    const Tag = (as ?? defaultTag) as ElementType;
    return (
      <Tag className={cn(defaultClass, className)} {...rest}>
        {children}
      </Tag>
    );
  };
}

export const Display = make(
  "text-4xl font-semibold tracking-tight text-foreground sm:text-6xl",
  "h1",
);

export const PageTitle = make(
  "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
  "h1",
);

export const SectionTitle = make(
  "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
  "h2",
);

export const CardTitle = make(
  "text-base font-medium text-foreground",
  "h3",
);

export const Body = make(
  "text-sm leading-relaxed text-foreground sm:text-base",
  "p",
);

export const Caption = make(
  "text-xs text-muted-foreground",
  "p",
);

export const Muted = make(
  "text-sm text-muted-foreground",
  "p",
);

export const HelperText = make(
  "text-xs text-muted-foreground",
  "p",
);

export function Label({
  className,
  children,
  htmlFor,
  required,
}: {
  className?: string;
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground",
        className,
      )}
    >
      {children}
      {required ? <span className="ml-1 text-destructive">*</span> : null}
    </label>
  );
}

export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const STATUS_TEXT: Record<StatusTone, string> = {
  neutral: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-accent",
};

export function StatusText({
  tone = "neutral",
  className,
  children,
}: {
  tone?: StatusTone;
  className?: string;
  children: ReactNode;
}) {
  return <span className={cn("text-xs font-medium", STATUS_TEXT[tone], className)}>{children}</span>;
}
