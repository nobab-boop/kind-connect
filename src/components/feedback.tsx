import type { ReactNode } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/* ------------------------------ Spinner ------------------------------ */

export function Spinner({
  size = "md",
  className,
  label = "Loading",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const cls = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <Loader2
      role="status"
      aria-label={label}
      className={cn("animate-spin text-muted-foreground", cls, className)}
    />
  );
}

/* ------------------------------ Banner / State ------------------------------ */

type Tone = "info" | "success" | "warning" | "danger" | "neutral";

const TONE_STYLES: Record<Tone, { wrap: string; icon: ReactNode }> = {
  info: {
    wrap: "border-accent/30 bg-accent/10 text-foreground",
    icon: <Info className="h-4 w-4 text-accent" aria-hidden />,
  },
  success: {
    wrap: "border-success/30 bg-success/10 text-foreground",
    icon: <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />,
  },
  warning: {
    wrap: "border-warning/30 bg-warning/10 text-foreground",
    icon: <AlertTriangle className="h-4 w-4 text-warning" aria-hidden />,
  },
  danger: {
    wrap: "border-destructive/30 bg-destructive/10 text-foreground",
    icon: <XCircle className="h-4 w-4 text-destructive" aria-hidden />,
  },
  neutral: {
    wrap: "border-border/60 bg-muted/30 text-foreground",
    icon: <Info className="h-4 w-4 text-muted-foreground" aria-hidden />,
  },
};

export function Banner({
  tone = "info",
  title,
  description,
  actions,
  className,
}: {
  tone?: Tone;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  const s = TONE_STYLES[tone];
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-start sm:justify-between",
        s.wrap,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{s.icon}</div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">{title}</div>
          {description ? (
            <div className="text-xs text-muted-foreground">{description}</div>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex items-center gap-2 sm:mt-0">{actions}</div> : null}
    </div>
  );
}

export function SuccessState(props: Omit<Parameters<typeof Banner>[0], "tone">) {
  return <Banner {...props} tone="success" />;
}
export function ErrorState(props: Omit<Parameters<typeof Banner>[0], "tone">) {
  return <Banner {...props} tone="danger" />;
}
export function WarningState(props: Omit<Parameters<typeof Banner>[0], "tone">) {
  return <Banner {...props} tone="warning" />;
}
export function InfoState(props: Omit<Parameters<typeof Banner>[0], "tone">) {
  return <Banner {...props} tone="info" />;
}

/* ------------------------------ Progress Indicator ------------------------------ */

export function ProgressIndicator({
  value,
  label,
  className,
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      ) : null}
      <Progress value={value} />
    </div>
  );
}

/* ------------------------------ Loading Overlay ------------------------------ */

export function LoadingOverlay({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "absolute inset-0 z-30 flex items-center justify-center gap-2 rounded-[inherit] bg-background/60 backdrop-blur-sm",
        className,
      )}
    >
      <Spinner size="md" />
      <span className="text-sm text-muted-foreground">{label}…</span>
    </div>
  );
}

/* ------------------------------ Status Indicator ------------------------------ */

const STATUS_DOT: Record<Tone, string> = {
  info: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
  neutral: "bg-muted-foreground",
};

export function StatusIndicator({
  tone = "neutral",
  label,
  pulse = false,
  className,
}: {
  tone?: Tone;
  label?: ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <span className="relative flex h-2 w-2">
        {pulse ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              STATUS_DOT[tone],
            )}
          />
        ) : null}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", STATUS_DOT[tone])} />
      </span>
      {label}
    </span>
  );
}

/* ------------------------------ Confirmation Dialog ------------------------------ */

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "neutral",
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "neutral" | "danger";
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              tone === "danger"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : undefined
            }
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/* ------------------------------ Loading Skeleton re-export ------------------------------ */

export { Skeleton as LoadingSkeleton } from "@/components/ui/skeleton";
