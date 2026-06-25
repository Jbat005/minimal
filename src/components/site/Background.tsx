import { Fragment, type ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  education,
  experience,
  skills,
  skillKeywords,
  type TimelineEntry,
} from "@/data/content";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const skillRe = new RegExp(
  `\\b(${[...skillKeywords]
    .sort((a, b) => b.length - a.length)
    .map(escapeRe)
    .join("|")})\\b`,
  "g",
);
const skillSet = new Set(skillKeywords.map((s) => s.toLowerCase()));

// Bold any listed skill that appears in a bullet.
function highlightSkills(text: string): ReactNode {
  return text.split(skillRe).map((part, i) =>
    skillSet.has(part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Timeline({ label, entries }: { label: string; entries: TimelineEntry[] }) {
  return (
    <div>
      <h3 className="eyebrow">{label}</h3>
      <ol className="mt-6 border-l border-line-2">
        {entries.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.06}>
            <li className="relative pb-8 pl-7 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-paper bg-ink ring-1 ring-ink" />
              <div className="text-[11px] uppercase tracking-[0.16em] text-faint">{e.when}</div>
              <h4 className="mt-1.5 font-serif text-2xl font-medium leading-tight tracking-tight text-ink">
                {e.title}
              </h4>
              <div className="mt-1 text-sm text-graphite">
                {e.orgHref ? (
                  <a
                    href={e.orgHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {e.org}
                  </a>
                ) : (
                  e.org
                )}
              </div>
              <ul className="mt-3 space-y-2">
                {e.points.map((pt, j) => (
                  <li key={j} className="relative pl-5 text-sm leading-relaxed text-muted">
                    <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-faint" />
                    {highlightSkills(pt)}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Background() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <SectionHeading eyebrow="Background" title="Experience & education." />

      <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
        <Timeline label="Experience" entries={experience} />
        <Timeline label="Education" entries={education} />
      </div>

      {/* skills — folded into the experience page */}
      <Reveal>
        <div className="mt-12 border-t border-line-2 pt-10">
          <h3 className="eyebrow">Skills</h3>
          <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {skills.map((block) => (
              <div key={block.group}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                  {block.group}
                </h4>
                <ul className="mt-3 space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item} className="text-[13px] leading-snug text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
