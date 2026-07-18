import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentCard, PageTitle } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_auth/sign-up")({
  head: () => ({
    meta: buildPageMeta({
      title: "Sign up",
      description: "Create a CreatorVault account.",
    }),
  }),
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <ContentCard className="flex flex-col gap-4 text-center">
      <PageTitle className="text-2xl sm:text-2xl">Create your account</PageTitle>
      <p className="text-sm text-muted-foreground">
        Sign-up will be enabled in a future phase. This is a scaffolded placeholder.
      </p>
      <div className="pt-2 text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </div>
    </ContentCard>
  );
}
