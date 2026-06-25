import { Reveal } from "@/components/site/Reveal";

/**
 * Consistent section header: a tracked eyebrow with a hairline, a large
 * serif title, and an optional lede. Used across every section for rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <div className="flex items-center gap-4">
        <span className="eyebrow whitespace-nowrap">{eyebrow}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{lede}</p>}
    </Reveal>
  );
}
