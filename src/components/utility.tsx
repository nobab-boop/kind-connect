import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ------------------------------ Icon Wrapper ------------------------------ */

export function IconWrapper({
  children,
  size = "md",
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  className?: string;
}) {
  const sizeCls = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const toneCls = {
    neutral: "bg-muted/40 text-foreground",
    accent: "bg-accent/15 text-accent",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/15 text-destructive",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg",
        sizeCls,
        toneCls,
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------ Copy Button ------------------------------ */

export function CopyButton({
  value,
  className,
  label = "Copy",
}: {
  value: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

/* ------------------------------ Code Block ------------------------------ */

export function CodeBlock({
  code,
  language,
  className,
  copyable = true,
}: {
  code: string;
  language?: string;
  className?: string;
  copyable?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-surface",
        className,
      )}
    >
      {language ? (
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{language}</span>
        </div>
      ) : null}
      <pre className="max-h-96 overflow-auto p-4 font-mono text-xs leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
      {copyable ? (
        <div className="pointer-events-none absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="pointer-events-auto">
            <CopyButton value={code} label="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Keyboard Shortcut ------------------------------ */

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-[1.4rem] items-center justify-center rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

export function KeyboardShortcut({ keys, className }: { keys: string[]; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((k, i) => (
        <span key={`${k}-${i}`} className="inline-flex items-center gap-1">
          <Kbd>{k}</Kbd>
          {i < keys.length - 1 ? <span className="text-muted-foreground">+</span> : null}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------ Tag & Chip ------------------------------ */

type ChipTone = "neutral" | "accent" | "success" | "warning" | "danger";

const CHIP_TONES: Record<ChipTone, string> = {
  neutral: "border-border/60 bg-muted/40 text-foreground",
  accent: "border-accent/30 bg-accent/15 text-accent",
  success: "border-success/30 bg-success/15 text-success",
  warning: "border-warning/30 bg-warning/15 text-warning",
  danger: "border-destructive/30 bg-destructive/15 text-destructive",
};

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
        CHIP_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chip({
  children,
  tone = "neutral",
  onRemove,
  className,
}: {
  children: ReactNode;
  tone?: ChipTone;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
        CHIP_TONES[tone],
        className,
      )}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 text-current opacity-70 hover:opacity-100"
          aria-label="Remove"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
