/**
 * Prompt Expert Engine — QuestionGroup.
 * Renders every visible question inside a group.
 */

import { QuestionRenderer } from "./QuestionRenderer";
import { isVisible } from "@/lib/prompt-engine/validation";
import type {
  Answers,
  QuestionGroup as QuestionGroupType,
  ValidationError,
} from "@/lib/prompt-engine/types";

type Props = {
  group: QuestionGroupType;
  answers: Answers;
  errors: ValidationError[];
  onChange: (id: string, value: unknown) => void;
};

export function QuestionGroup({ group, answers, errors, onChange }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
        {group.description ? (
          <p className="text-sm text-muted-foreground">{group.description}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-5">
        {group.questions.map((q) => {
          if (!isVisible(q, answers)) return null;
          const err = errors.find((e) => e.questionId === q.id)?.message;
          return (
            <QuestionRenderer
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(v) => onChange(q.id, v)}
              error={err}
            />
          );
        })}
      </div>
    </section>
  );
}
