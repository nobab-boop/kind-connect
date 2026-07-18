import { Link } from "@tanstack/react-router";
import { ResponsiveContainer } from "@/components/common";
import { FOOTER_NAV } from "@/lib/navigation";
import { APP } from "@/lib/constants";
import { Github, Twitter, Youtube, Instagram } from "lucide-react";

const SOCIALS = [
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "GitHub", href: "#", Icon: Github },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <ResponsiveContainer className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
              {APP.name}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {APP.description}
            </p>
            <div className="flex items-center gap-2 pt-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_NAV.map((section) => (
              <div key={section.label} className="flex flex-col gap-3">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
                  {section.label}
                </div>
                <ul className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP.name}. Built for creators in Bangladesh.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </ResponsiveContainer>
    </footer>
  );
}
