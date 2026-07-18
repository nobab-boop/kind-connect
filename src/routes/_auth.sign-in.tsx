import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentCard, PageTitle } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_auth/sign-in")({
  head: () => ({
    meta: buildPageMeta({
      title: "Sign in",
      description: "Sign in to CreatorVault.",
    }),
  }),
  component: SignInPage,
});

function SignInPage() {
  return (
    <ContentCard className="flex flex-col gap-4 text-center">
      <PageTitle className="text-2xl sm:text-2xl">Sign in</PageTitle>
      <p className="text-sm text-muted-foreground">
        Authentication is coming in a future phase. This is a scaffolded placeholder.
      </p>
      <div className="pt-2 text-xs text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-foreground underline-offset-4 hover:underline">
          Create one
        </Link>
      </div>
    </ContentCard>
  );
}
