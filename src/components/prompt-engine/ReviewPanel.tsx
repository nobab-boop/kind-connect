/**
 * Prompt Expert Engine — ReviewPanel.
 * Renders every answered question grouped by section, with jump-to-edit.
 */

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { isVisible } from "@/lib/prompt-engine/validation";
import type { Answers, PromptExpertDefinition } from "@/lib/prompt-engine/types";

type Props = {
  expert: PromptExpertDefinition;
  answers: Answers;
  onEditGroup: (groupId: string) => void;
};

export function ReviewPanel({ expert, answers, onEditGroup }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {expert.groups.map((g) => (
        <div key={g.id} className="rounded-xl border border-border/60 bg-background/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEditGroup(g.id)}
              aria-label={`Edit ${g.title}`}
            >
              <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
            </Button>
          </div>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {g.questions
              .filter((q) => isVisible(q, answers))
              .map((q) => (
                <div key={q.id} className="flex flex-col gap-1">
                  <dt className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {q.label}
                  </dt>
                  <dd className="text-sm text-foreground">
                    {formatAnswer(answers[q.id])}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function formatAnswer(v: unknown): string {
  if (v === undefined || v === null || v === "") return "—";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}
