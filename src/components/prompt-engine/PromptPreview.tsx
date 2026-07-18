/**
 * Prompt Expert Engine — PromptPreview.
 *
 * Placeholder panel that will eventually render AI output. For Phase 6 it
 * interpolates the expert's mock section templates with the current answers
 * so users can see how their inputs will flow into the real prompt.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Answers, PromptExpertDefinition } from "@/lib/prompt-engine/types";

type Props = {
  expert: PromptExpertDefinition;
  answers: Answers;
};

export function PromptPreview({ expert, answers }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline">Preview</Badge>
        <span className="text-xs text-muted-foreground">
          Mock only — real generation ships in a later phase.
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {expert.outputSections.map((s) => (
          <PreviewSection
            key={s.id}
            title={s.title}
            language={s.language}
            body={interpolate(s.mock, answers)}
          />
        ))}
      </div>
    </div>
  );
}

function PreviewSection({
  title,
  body,
  language,
}: {
  title: string;
  body: string;
  language?: string;
}) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="rounded-xl border border-border/60 bg-background/40">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Collapse section" : "Expand section"}
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <span className="text-sm font-medium text-foreground">{title}</span>
          {language ? (
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {language}
            </span>
          ) : null}
        </div>
        <Button size="sm" variant="ghost" onClick={copy} aria-label={`Copy ${title}`}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre
        className={cn(
          "overflow-x-auto whitespace-pre-wrap break-words border-t border-border/60 px-3 py-3 font-mono text-xs text-foreground/90",
          !open && "hidden",
        )}
      >
        {body}
      </pre>
    </div>
  );
}

/** Replace `{id}` tokens with formatted answer values. */
function interpolate(template: string, answers: Answers): string {
  return template.replace(/\{([a-zA-Z0-9_-]+)\}/g, (_, key: string) => {
    const v = answers[key];
    if (v === undefined || v === null || v === "") return `{${key}}`;
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "boolean") return v ? "yes" : "no";
    return String(v);
  });
}
