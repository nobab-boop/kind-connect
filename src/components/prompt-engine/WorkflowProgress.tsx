/**
 * Prompt Expert Engine — WorkflowProgress.
 * Step indicator with keyboard-navigable step buttons.
 */

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowStep } from "@/lib/prompt-engine/types";

type Props = {
  steps: WorkflowStep[];
  currentIndex: number;
  onJump?: (index: number) => void;
};

export function WorkflowProgress({ steps, currentIndex, onJump }: Props) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Workflow progress">
      {steps.map((s, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "todo";
        return (
          <li key={s.id} className="flex items-center gap-2">
            <button
              type="button"
              disabled={!onJump || i > currentIndex}
              onClick={() => onJump?.(i)}
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors",
                state === "current" && "border-primary bg-primary/10 text-foreground",
                state === "done" && "border-border/60 text-muted-foreground hover:text-foreground",
                state === "todo" && "border-border/60 text-muted-foreground/60",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                  state === "done"
                    ? "bg-primary text-primary-foreground"
                    : state === "current"
                      ? "bg-primary/20 text-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {state === "done" ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {s.title}
            </button>
            {i < steps.length - 1 ? (
              <span aria-hidden className="text-muted-foreground/40">/</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
