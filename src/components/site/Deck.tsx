"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/site/Nav";
import { Intro } from "@/components/site/Intro";
import { Work } from "@/components/site/Work";
import { Background } from "@/components/site/Background";
import { Contact } from "@/components/site/Contact";

type Tone = "paper" | "paper-2" | "dark";
type Page = { id: string; label: string; tone: Tone; fill?: boolean; node: ReactNode };

const pages: Page[] = [
  { id: "top", label: "Intro", tone: "paper", fill: true, node: <Intro /> },
  { id: "background", label: "Experience", tone: "paper-2", node: <Background /> },
  { id: "work", label: "Work", tone: "paper", fill: true, node: <Work /> },
  { id: "contact", label: "Contact", tone: "dark", node: <Contact /> },
];

// Legacy/aliased hash ids that should resolve to an existing slide.
const aliasId = (id: string) => (id === "about" ? "top" : id);

const COUNT = pages.length;

function Panel({
  id,
  tone,
  fill,
  children,
}: {
  id: string;
  tone: Tone;
  fill?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "h-[100svh] w-screen shrink-0 overflow-y-auto overflow-x-hidden",
        tone === "dark" ? "bg-ink-2 text-paper" : tone === "paper-2" ? "bg-paper-2" : "bg-paper",
      )}
    >
      <div
        className={cn(
          "flex min-h-full flex-col px-14 pt-20 sm:px-16 lg:px-24",
          fill ? "pb-12" : "pb-20",
        )}
      >
        {/* fill slides drive their own vertical layout; others are centered */}
        {fill ? children : <div className="my-auto w-full">{children}</div>}
      </div>
    </section>
  );
}

export function Deck() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const touch = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(COUNT - 1, i)));
  }, []);
  const next = useCallback(() => setIndex((i) => Math.min(COUNT - 1, i + 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // Deep-link support: honor an initial #hash (e.g. project pages link back to
  // index.html#work), and keep the URL hash in sync as slides change.
  useEffect(() => {
    const id = aliasId(window.location.hash.replace("#", ""));
    const i = pages.findIndex((p) => p.id === id);
    if (i > 0) setIndex(i);
  }, []);

  useEffect(() => {
    const id = pages[index]?.id;
    if (id) window.history.replaceState(null, "", `#${id}`);
  }, [index]);

  // Keyboard arrows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Intercept in-app anchor links (#about, #work, …) and turn them into slide moves.
  const onRootClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = aliasId(a.getAttribute("href")!.slice(1));
    const i = pages.findIndex((p) => p.id === id);
    if (i >= 0) {
      e.preventDefault();
      goTo(i);
    }
  };

  // Horizontal swipe (ignores vertical scrolling inside a panel).
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else prev();
    }
  };

  const dark = pages[index].tone === "dark";

  return (
    <div
      className="relative h-[100svh] w-screen overflow-hidden bg-paper"
      onClick={onRootClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Nav currentId={pages[index].id} dark={dark} />

      {/* horizontal track */}
      <div
        className="flex h-full w-max"
        style={{
          transform: `translateX(-${index * 100}vw)`,
          transition: reduce ? "none" : "transform 700ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {pages.map((p) => (
          <Panel key={p.id} id={p.id} tone={p.tone} fill={p.fill}>
            {p.node}
          </Panel>
        ))}
      </div>

      {/* arrows */}
      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        aria-label="Previous section"
        className={cn(
          "fixed left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 sm:left-4 sm:h-12 sm:w-12",
          dark
            ? "border-paper/25 text-paper hover:bg-paper hover:text-ink"
            : "border-ink/15 text-ink hover:bg-ink hover:text-paper",
          index === 0 && "pointer-events-none opacity-20",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        disabled={index === COUNT - 1}
        aria-label="Next section"
        className={cn(
          "fixed right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 sm:right-4 sm:h-12 sm:w-12",
          dark
            ? "border-paper/25 text-paper hover:bg-paper hover:text-ink"
            : "border-ink/15 text-ink hover:bg-ink hover:text-paper",
          index === COUNT - 1 && "pointer-events-none opacity-20",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* slide indicator */}
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5">
        {pages.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.label}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6" : "w-1.5",
              dark
                ? i === index
                  ? "bg-paper"
                  : "bg-paper/30 hover:bg-paper/60"
                : i === index
                  ? "bg-ink"
                  : "bg-ink/25 hover:bg-ink/50",
            )}
          />
        ))}
      </div>

      {/* counter */}
      <div
        className={cn(
          "fixed bottom-5 right-5 z-40 hidden text-[11px] tabular-nums tracking-[0.2em] sm:block",
          dark ? "text-paper/50" : "text-faint",
        )}
      >
        {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
      </div>
    </div>
  );
}
