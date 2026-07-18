import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: buildPageMeta({
      title: "Contact",
      description:
        "Get in touch with the CreatorVault team for support, partnerships, or feedback.",
    }),
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Contact"
          title="Talk to the CreatorVault team"
          description="We usually respond within one business day."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            {[
              { Icon: Mail, label: "Email", value: "hello@creatorvault.app" },
              { Icon: MessageCircle, label: "Support", value: "support@creatorvault.app" },
              { Icon: MapPin, label: "Based in", value: "Dhaka, Bangladesh" },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/40 p-5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/40 text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="text-sm text-foreground">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us a bit about what you need…"
              />
            </div>
            <div className="flex items-center justify-between gap-2 pt-2">
              <p className="text-xs text-muted-foreground">
                This form is a placeholder — submissions are not sent yet.
              </p>
              <Button type="submit">Send message</Button>
            </div>
          </form>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
