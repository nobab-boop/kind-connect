import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ContentCard,
  PageHeader,
  PageWrapper,
  ResponsiveContainer,
} from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, MessageCircle, AlertTriangle, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/_dashboard/help")({
  head: () => ({
    meta: buildPageMeta({
      title: "Help Center",
      description: "Documentation, support, feature requests, and shortcuts.",
    }),
  }),
  component: HelpPage,
});

const SHORTCUTS: { keys: string; action: string }[] = [
  { keys: "⌘ K", action: "Open command menu" },
  { keys: "G then D", action: "Go to Dashboard" },
  { keys: "G then E", action: "Go to Prompt Experts" },
  { keys: "G then F", action: "Go to Favorites" },
  { keys: "G then H", action: "Go to History" },
  { keys: "?", action: "Show keyboard shortcuts" },
];

function HelpPage() {
  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-6">
        <PageHeader
          eyebrow="Support"
          title="Help Center"
          description="Documentation, support, and feedback in one place."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <HelpCard
            icon={<BookOpen className="h-4 w-4" />}
            title="Documentation"
            body="Learn how CreatorVault works — experts, workflows, and best practices."
            cta="Browse docs"
          />
          <HelpCard
            icon={<MessageCircle className="h-4 w-4" />}
            title="Contact support"
            body="Reach the CreatorVault team for account or billing questions."
            cta="Contact us"
            href="/contact"
          />
          <HelpCard
            icon={<AlertTriangle className="h-4 w-4" />}
            title="Report an issue"
            body="Found a bug or something unexpected? Let us know."
            cta="Report issue"
          />
          <HelpCard
            icon={<Lightbulb className="h-4 w-4" />}
            title="Request a feature"
            body="Tell us what you want to see next in CreatorVault."
            cta="Request feature"
          />
        </div>

        <ContentCard>
          <h2 className="text-base font-medium text-foreground">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This form is a UI placeholder — submission ships in a later phase.
          </p>
          <form
            className="mt-4 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1.5">
              <Label>Topic</Label>
              <Input placeholder="Billing, bug, feature request…" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <Label>Message</Label>
              <Textarea rows={5} placeholder="Tell us what's on your mind…" />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <Button disabled>Send message</Button>
            </div>
          </form>
        </ContentCard>

        <ContentCard>
          <h2 className="text-base font-medium text-foreground">Keyboard shortcuts</h2>
          <ul className="mt-4 divide-y divide-border/60">
            {SHORTCUTS.map((s) => (
              <li key={s.keys} className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">{s.action}</span>
                <kbd className="rounded-md border border-border/60 bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {s.keys}
                </kbd>
              </li>
            ))}
          </ul>
        </ContentCard>
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function HelpCard({
  icon,
  title,
  body,
  cta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
  href?: string;
}) {
  const button = (
    <Button variant="outline" size="sm">
      {cta}
    </Button>
  );
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <p className="mt-1 text-xs text-muted-foreground">{body}</p>
      </div>
      <div className="mt-auto">
        {href ? <Link to={href}>{button}</Link> : button}
      </div>
    </div>
  );
}
