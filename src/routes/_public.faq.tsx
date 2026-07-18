import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildPageMeta } from "@/lib/seo";
import { FAQS } from "@/lib/marketing";

export const Route = createFileRoute("/_public/faq")({
  head: () => ({
    meta: buildPageMeta({
      title: "FAQ",
      description:
        "Answers to common questions about CreatorVault, Prompt Experts, pricing, and supported AI platforms.",
    }),
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Can't find what you're looking for? Reach out on the contact page."
        />
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border/60 bg-card/40 px-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
