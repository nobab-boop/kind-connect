import { createFileRoute } from "@tanstack/react-router";
import {
  ContentCard,
  PageHeader,
  PageWrapper,
  ResponsiveContainer,
} from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_USER } from "@/lib/mock-data";
import type { ReactNode } from "react";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({
    meta: buildPageMeta({
      title: "Settings",
      description: "Manage your CreatorVault profile, preferences, and account.",
    }),
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Account"
          title="Settings"
          description="Placeholders for profile, preferences, and security. Wiring ships in later phases."
        />

        <Section title="Profile" description="Public identity and display info.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name">
              <Input defaultValue={MOCK_USER.displayName} />
            </Field>
            <Field label="Handle">
              <Input defaultValue={MOCK_USER.handle} />
            </Field>
            <Field label="Email">
              <Input type="email" defaultValue="rafi@example.com" />
            </Field>
            <Field label="Country">
              <Input defaultValue="Bangladesh" />
            </Field>
          </div>
          <SaveRow />
        </Section>

        <Section title="Language" description="Choose the CreatorVault interface language.">
          <Field label="Interface language" className="sm:max-w-sm">
            <Select defaultValue="en">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="bn">বাংলা (Bangla)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <Section title="Theme" description="Dark by default. Light theme ships later.">
          <Field label="Appearance" className="sm:max-w-sm">
            <Select defaultValue="dark">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">Match system</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <Section title="Notifications" description="Choose what CreatorVault emails you about.">
          <div className="flex flex-col gap-4">
            <ToggleRow label="Weekly product updates" defaultChecked />
            <ToggleRow label="New Prompt Expert launches" defaultChecked />
            <ToggleRow label="Billing and receipts" defaultChecked />
            <ToggleRow label="Marketing tips" />
          </div>
        </Section>

        <Section
          title="Connected AI Accounts"
          description="Bring your own keys for ChatGPT, Gemini, Veo, and more."
        >
          <div className="flex flex-col gap-3">
            {["ChatGPT", "Gemini", "Veo", "ElevenLabs"].map((p) => (
              <div
                key={p}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">{p}</div>
                  <div className="text-xs text-muted-foreground">Not connected</div>
                </div>
                <Badge variant="outline">Coming soon</Badge>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Subscription" description="Your current CreatorVault plan.">
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">{MOCK_USER.plan} plan</div>
              <div className="text-xs text-muted-foreground">Renews on 2026-08-01</div>
            </div>
            <Button variant="outline">Manage subscription</Button>
          </div>
        </Section>

        <Section title="Security" description="Password and account protection.">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4">
              <div>
                <div className="text-sm font-medium text-foreground">Change password</div>
                <div className="text-xs text-muted-foreground">Update your account password.</div>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4">
              <div>
                <div className="text-sm font-medium text-foreground">Two-factor authentication</div>
                <div className="text-xs text-muted-foreground">Adds an extra layer of protection.</div>
              </div>
              <Badge variant="outline">Coming soon</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-destructive/40 bg-destructive/5 p-4">
              <div>
                <div className="text-sm font-medium text-destructive">Delete account</div>
                <div className="text-xs text-muted-foreground">Permanently remove your account and data.</div>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </Section>
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <ContentCard>
      <div className="mb-4">
        <h2 className="text-base font-medium text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </ContentCard>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <Label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="text-sm text-foreground">{label}</div>
      <Switch defaultChecked={defaultChecked} aria-label={label} />
    </div>
  );
}

function SaveRow() {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button>Save changes</Button>
    </div>
  );
}
