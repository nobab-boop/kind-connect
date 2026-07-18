import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ResponsiveContainer } from "@/components/common";
import { NavigationItem } from "@/components/common/NavigationItem";
import { PUBLIC_NAV, AUTH_NAV } from "@/lib/navigation";
import { APP } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <ResponsiveContainer className="flex h-14 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
          {APP.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {PUBLIC_NAV.map((item) => (
            <NavigationItem key={item.to} to={item.to}>
              {item.label}
            </NavigationItem>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to={AUTH_NAV.signIn.to}>{AUTH_NAV.signIn.label}</Link>
          </Button>
          <Button asChild size="sm">
            <Link to={AUTH_NAV.signUp.to}>{AUTH_NAV.signUp.label}</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav
                aria-label="Mobile"
                className="mt-6 flex flex-col gap-1"
              >
                {PUBLIC_NAV.map((item) => (
                  <NavigationItem
                    key={item.to}
                    to={item.to}
                    variant="sidebar"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavigationItem>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={AUTH_NAV.signIn.to} onClick={() => setOpen(false)}>
                    {AUTH_NAV.signIn.label}
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={AUTH_NAV.signUp.to} onClick={() => setOpen(false)}>
                    {AUTH_NAV.signUp.label}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ResponsiveContainer>
    </header>
  );
}
