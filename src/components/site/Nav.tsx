import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, profile } from "@/data/content";

export function Nav({ currentId, dark }: { currentId: string; dark: boolean }) {
  const [open, setOpen] = useState(false);
  const isTop = currentId === "top";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        dark
          ? "border-b border-paper/10 bg-ink-2/80 backdrop-blur-md"
          : isTop
            ? "border-b border-transparent bg-transparent"
            : "border-b border-line/80 bg-paper/80 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
        <a
          href="#top"
          className={cn(
            "font-serif text-xl font-semibold tracking-tight transition-colors",
            dark ? "text-paper" : "text-ink",
          )}
          aria-label="Jean Batista — first slide"
        >
          Jean Batista<span className={dark ? "text-paper/40" : "text-faint"}>.</span>
        </a>

        {/* desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = currentId === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-[13px] font-medium tracking-wide transition-colors duration-200",
                    dark
                      ? active
                        ? "text-paper"
                        : "text-paper/60 hover:text-paper"
                      : active
                        ? "text-ink"
                        : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={`mailto:${profile.email}`}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-200",
                dark
                  ? "border-paper/25 text-paper hover:bg-paper hover:text-ink"
                  : "border-ink/15 text-ink hover:bg-ink hover:text-paper",
              )}
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "-mr-2 inline-flex h-10 w-10 items-center justify-center md:hidden",
            dark ? "text-paper" : "text-ink",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div
          className={cn(
            "border-t backdrop-blur-md md:hidden",
            dark ? "border-paper/10 bg-ink-2/95" : "border-line bg-paper/95",
          )}
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-3 text-sm font-medium tracking-wide transition-colors",
                    dark ? "text-paper/70 hover:text-paper" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-sm font-medium",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                Get in touch →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
