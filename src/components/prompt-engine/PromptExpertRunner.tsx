/**
 * Prompt Expert Engine — Runner.
 *
 * Orchestrates a Prompt Expert workflow end-to-end using nothing but the
 * expert's declarative definition. The runner is the ONLY stateful piece
 * of the engine; every other component is presentational.
 *
 * Local-only state:
 *   - Current step index
 *   - Answers map (Record<questionId, value>)
 *   - Per-group validation errors
 *   - Recent-experts + favorites via localStorage
 *
 * When the backend arrives:
 *   - Persist answers to `public.generations` (draft) on step change.
 *   - Replace mock preview with real generation output.
 *   - Move favorites / recent-experts to `public.favorites` / `public.recent_experts`.
 */

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Heart, Sparkles } from "lucide-react";
import { ContentCard } from "@/components/common";
import { WorkflowProgress } from "./WorkflowProgress";
import { QuestionGroup } from "./QuestionGroup";
import { ReviewPanel } from "./ReviewPanel";
import { PromptPreview } from "./PromptPreview";
import {
  buildDefaultAnswers,
  validateAll,
  validateGroup,
} from "@/lib/prompt-engine/validation";
import type { PromptExpertDefinition, ValidationError } from "@/lib/prompt-engine/types";
import {
  isFavorite,
  toggleFavorite,
  pushRecentExpert,
} from "@/lib/prompt-engine/local-store";

type Props = { expert: PromptExpertDefinition };

export function PromptExpertRunner({ expert }: Props) {
  const [answers, setAnswers] = useState(() => buildDefaultAnswers(expert));
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(expert.slug));
    pushRecentExpert(expert.slug);
  }, [expert.slug]);

  const step = expert.workflow[stepIndex];
  const isLast = stepIndex === expert.workflow.length - 1;
  const isReview = step.kind === "review";
  const isGenerate = step.kind === "generate";

  const currentGroupErrors = useMemo(() => {
    if (step.kind !== "questions" || !step.groupId) return [];
    return validateGroup(expert, step.groupId, answers);
  }, [expert, step, answers]);

  const allErrors = useMemo(() => validateAll(expert, answers), [expert, answers]);

  const next = () => {
    if (step.kind === "questions" && step.groupId) {
      const errs = validateGroup(expert, step.groupId, answers);
      setErrors(errs);
      if (errs.length) {
        toast.error("Please fix the highlighted fields.");
        return;
      }
    }
    if (isReview) {
      const errs = validateAll(expert, answers);
      setErrors(errs);
      if (errs.length) {
        toast.error("Some answers need attention before generating.");
        return;
      }
    }
    setErrors([]);
    setStepIndex((i) => Math.min(i + 1, expert.workflow.length - 1));
  };

  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const jumpToGroup = (groupId: string) => {
    const idx = expert.workflow.findIndex(
      (w) => w.kind === "questions" && w.groupId === groupId,
    );
    if (idx >= 0) setStepIndex(idx);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <ContentCard className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl" aria-hidden>
            {expert.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {expert.name}
              </h1>
              <Badge variant="outline">{expert.difficulty}</Badge>
              <Badge variant="secondary">{expert.category}</Badge>
              {expert.premium ? <Badge>Premium</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{expert.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={fav ? "default" : "outline"}
            size="sm"
            onClick={() => {
              const nowFav = toggleFavorite(expert.slug);
              setFav(nowFav);
              toast.success(nowFav ? "Added to favorites" : "Removed from favorites");
            }}
            aria-pressed={fav}
          >
            <Heart className={fav ? "mr-1 h-4 w-4 fill-current" : "mr-1 h-4 w-4"} />
            {fav ? "Favorited" : "Favorite"}
          </Button>
        </div>
      </ContentCard>

      {/* Progress */}
      <ContentCard className="p-4">
        <WorkflowProgress
          steps={expert.workflow}
          currentIndex={stepIndex}
          onJump={(i) => setStepIndex(i)}
        />
      </ContentCard>

      {/* Body: two columns on md+, single on mobile */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ContentCard className="flex flex-col gap-6">
          {step.kind === "questions" && step.groupId
            ? (() => {
                const group = expert.groups.find((g) => g.id === step.groupId);
                if (!group) return null;
                const combinedErrors = errors.length ? errors : currentGroupErrors.length && false ? currentGroupErrors : [];
                return (
                  <QuestionGroup
                    group={group}
                    answers={answers}
                    errors={combinedErrors}
                    onChange={(id, v) => {
                      setAnswers((prev) => ({ ...prev, [id]: v }));
                      if (errors.length) {
                        setErrors((prev) => prev.filter((e) => e.questionId !== id));
                      }
                    }}
                  />
                );
              })()
            : null}

          {isReview ? (
            <ReviewPanel expert={expert} answers={answers} onEditGroup={jumpToGroup} />
          ) : null}

          {isGenerate ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Ready to generate</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Real generation ships in a later phase. For now, the preview panel
                shows how your answers will flow into the final prompt.
              </p>
              <Button size="lg" disabled>
                <Sparkles className="mr-2 h-4 w-4" /> Generate (coming soon)
              </Button>
            </div>
          ) : null}

          {/* Nav */}
          <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-4">
            <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <div className="text-xs text-muted-foreground">
              Step {stepIndex + 1} of {expert.workflow.length}
            </div>
            <Button onClick={next} disabled={isLast}>
              {isReview ? "Continue" : "Next"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </ContentCard>

        {/* Preview */}
        <ContentCard className="h-fit lg:sticky lg:top-20">
          <PromptPreview expert={expert} answers={answers} />
          {allErrors.length > 0 && !isGenerate ? (
            <p className="mt-3 text-[11px] text-muted-foreground">
              {allErrors.length} unresolved question{allErrors.length === 1 ? "" : "s"}.
            </p>
          ) : null}
        </ContentCard>
      </div>
    </div>
  );
}
