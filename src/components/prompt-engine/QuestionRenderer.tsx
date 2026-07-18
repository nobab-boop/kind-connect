/**
 * Prompt Expert Engine — QuestionRenderer.
 *
 * Renders a single Question from its declarative definition. The renderer
 * is generic: it never inspects which expert is running.
 */

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/prompt-engine/types";

type Props = {
  question: Question;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
};

export function QuestionRenderer({ question: q, value, onChange, error }: Props) {
  const fieldId = `q-${q.id}`;
  const describedBy = [
    q.description ? `${fieldId}-desc` : null,
    error ? `${fieldId}-err` : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={fieldId} className="text-sm font-medium">
          {q.label}
          {q.required ? <span className="ml-1 text-destructive">*</span> : null}
        </Label>
        {q.validation?.maxLength && typeof value === "string" ? (
          <span className="text-[11px] text-muted-foreground">
            {value.length}/{q.validation.maxLength}
          </span>
        ) : null}
      </div>
      {q.description ? (
        <p id={`${fieldId}-desc`} className="text-xs text-muted-foreground">
          {q.description}
        </p>
      ) : null}

      {renderControl(q, value, onChange, fieldId, describedBy, !!error)}

      {error ? (
        <p id={`${fieldId}-err`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function renderControl(
  q: Question,
  value: unknown,
  onChange: (v: unknown) => void,
  fieldId: string,
  describedBy: string | undefined,
  invalid: boolean,
) {
  const invalidClass = invalid ? "border-destructive focus-visible:ring-destructive" : "";

  switch (q.type) {
    case "text":
    case "color":
      return (
        <Input
          id={fieldId}
          type={q.type === "color" ? "text" : "text"}
          value={(value as string) ?? ""}
          placeholder={q.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={cn(invalidClass)}
        />
      );

    case "textarea":
      return (
        <Textarea
          id={fieldId}
          value={(value as string) ?? ""}
          placeholder={q.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={cn("min-h-24", invalidClass)}
        />
      );

    case "number": {
      const num = value as number | undefined;
      return (
        <Input
          id={fieldId}
          type="number"
          value={num ?? ""}
          min={q.min}
          max={q.max}
          step={q.step ?? 1}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? undefined : Number(v));
          }}
          className={cn(invalidClass)}
        />
      );
    }

    case "select":
      return (
        <Select value={(value as string) ?? ""} onValueChange={(v) => onChange(v)}>
          <SelectTrigger id={fieldId} aria-invalid={invalid || undefined} aria-describedby={describedBy}>
            <SelectValue placeholder={q.placeholder ?? "Select…"} />
          </SelectTrigger>
          <SelectContent>
            {q.options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          value={(value as string) ?? ""}
          onValueChange={(v) => onChange(v)}
          aria-describedby={describedBy}
        >
          {q.options?.map((o) => {
            const id = `${fieldId}-${o.value}`;
            return (
              <div key={o.value} className="flex items-start gap-2">
                <RadioGroupItem id={id} value={o.value} />
                <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                  {o.label}
                  {o.description ? (
                    <span className="block text-xs text-muted-foreground">{o.description}</span>
                  ) : null}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      );

    case "multi-select":
    case "checkbox": {
      const arr = Array.isArray(value) ? (value as string[]) : [];
      const toggle = (v: string) =>
        onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
      return (
        <div className="flex flex-wrap gap-2" role="group" aria-describedby={describedBy}>
          {q.options?.map((o) => {
            const active = arr.includes(o.value);
            const id = `${fieldId}-${o.value}`;
            if (q.type === "checkbox") {
              return (
                <div key={o.value} className="flex items-start gap-2 basis-full sm:basis-[calc(50%-0.25rem)]">
                  <Checkbox id={id} checked={active} onCheckedChange={() => toggle(o.value)} />
                  <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                    {o.label}
                  </Label>
                </div>
              );
            }
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => toggle(o.value)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground",
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      );
    }

    case "switch":
      return (
        <div className="flex items-center gap-3">
          <Switch
            id={fieldId}
            checked={!!value}
            onCheckedChange={(v) => onChange(v)}
            aria-describedby={describedBy}
          />
          <span className="text-xs text-muted-foreground">
            {value ? "Enabled" : "Disabled"}
          </span>
        </div>
      );

    case "slider": {
      const num = typeof value === "number" ? value : q.min ?? 0;
      return (
        <div className="flex flex-col gap-2">
          <Slider
            id={fieldId}
            value={[num]}
            min={q.min ?? 0}
            max={q.max ?? 10}
            step={q.step ?? 1}
            onValueChange={([v]) => onChange(v)}
            aria-describedby={describedBy}
          />
          <div className="text-xs text-muted-foreground">Value: {num}</div>
        </div>
      );
    }

    case "file":
      return (
        <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
          <Badge variant="outline" className="mr-2">Placeholder</Badge>
          File upload ships in a later phase.
        </div>
      );
  }
}
