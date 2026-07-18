import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, Search, Upload, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HelperText, Label as FieldLabel, StatusText } from "@/components/typography";

/* ------------------------------ Field Wrapper ------------------------------ */

export function Field({
  label,
  htmlFor,
  required,
  helper,
  error,
  success,
  children,
  className,
}: {
  label?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  helper?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <FieldLabel htmlFor={htmlFor} required={required}>
          {label}
        </FieldLabel>
      ) : null}
      {children}
      {error ? (
        <StatusText tone="danger">{error}</StatusText>
      ) : success ? (
        <StatusText tone="success">{success}</StatusText>
      ) : helper ? (
        <HelperText>{helper}</HelperText>
      ) : null}
    </div>
  );
}

/* ------------------------------ Password Input ------------------------------ */

export const PasswordInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function PasswordInput({ className, ...props }, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);

/* ------------------------------ Search Input ------------------------------ */

export const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function SearchInput({ className, placeholder = "Search…", ...props }, ref) {
    return (
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={cn("pl-9", className)}
          {...props}
        />
      </div>
    );
  },
);

/* ------------------------------ Number Input ------------------------------ */

export const NumberInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function NumberInput({ className, ...props }, ref) {
    return <Input ref={ref} type="number" inputMode="decimal" className={className} {...props} />;
  },
);

/* ------------------------------ Email Input ------------------------------ */

export const EmailInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function EmailInput({ className, ...props }, ref) {
    return (
      <Input
        ref={ref}
        type="email"
        autoComplete="email"
        inputMode="email"
        className={className}
        {...props}
      />
    );
  },
);

/* ------------------------------ Character Counter ------------------------------ */

export function CharacterCounter({
  value,
  max,
  className,
}: {
  value: string;
  max: number;
  className?: string;
}) {
  const over = value.length > max;
  return (
    <div
      className={cn(
        "text-right text-[11px] tabular-nums",
        over ? "text-destructive" : "text-muted-foreground",
        className,
      )}
      aria-live="polite"
    >
      {value.length}/{max}
    </div>
  );
}

/* ------------------------------ Placeholders (Multi-Select / Date / File) ------------------------------ */

export function MultiSelectPlaceholder({
  placeholder = "Multi-select coming soon",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-9 items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground",
        className,
      )}
      aria-disabled
    >
      {placeholder}
    </div>
  );
}

export function DatePickerPlaceholder({
  placeholder = "Select date",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("w-full justify-start font-normal text-muted-foreground", className)}
      disabled
    >
      <Calendar className="h-4 w-4" />
      {placeholder}
    </Button>
  );
}

export function FileUploadPlaceholder({
  hint = "Drag & drop or browse",
  className,
}: {
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      <Upload className="h-5 w-5" />
      <span>{hint}</span>
      <span className="text-[11px]">File upload arrives in a later phase.</span>
    </div>
  );
}

/* Re-exports for convenience */
export { Input as TextInput } from "@/components/ui/input";
export { Textarea };
