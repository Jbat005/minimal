import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { caseStudy, MEASURE_LABEL } from "@/data/content";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTrigger,
} from "@/components/ui/stepper";

const SCALE_MAX = 5;

function ResearchPipeline() {
  return (
    <Reveal>
      <div className="mt-16 border-t border-line pt-12">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow">The process</div>
            <h3 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight text-ink">
              Eight steps from research to report.
            </h3>
          </div>
          <div className="md:col-span-8">
            <Stepper defaultValue={1} className="space-y-5">
              <StepperNav className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {caseStudy.processSteps.map((item) => (
                  <StepperItem key={item.step} step={item.step} className="justify-stretch">
                    <StepperTrigger className="min-h-14 w-full rounded-sm border border-line-2 bg-paper px-3 py-2 text-left transition-colors hover:border-ink/35 data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=completed]:border-graphite/45">
                      <StepperIndicator className="size-8 border border-line-2 text-[13px] font-medium">
                        {item.step}
                      </StepperIndicator>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-faint group-data-[state=active]/step:text-paper/60">
                          Step {item.step}
                        </span>
                        <span className="mt-1 block text-sm font-medium leading-tight text-ink group-data-[state=active]/step:text-paper">
                          {item.title}
                        </span>
                      </span>
                    </StepperTrigger>
                  </StepperItem>
                ))}
              </StepperNav>

              <StepperPanel className="rounded-sm border border-line bg-paper-2 p-6 sm:p-7">
                {caseStudy.processSteps.map((item) => (
                  <StepperContent key={item.step} value={item.step}>
                    <div className="eyebrow">Step {item.step}</div>
                    <h4 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight text-ink">
                      {item.title}
                    </h4>
                    <p className="mt-4 leading-relaxed text-muted md:text-[15px]">
                      {item.description}
                    </p>
                    {"href" in item && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                      >
                        <span className="link-underline">{item.linkLabel}</span>
                        <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                      </a>
                    )}
                  </StepperContent>
                ))}
              </StepperPanel>
            </Stepper>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Work() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* header */}
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="eyebrow whitespace-nowrap">{caseStudy.eyebrow}</span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow hidden whitespace-nowrap sm:inline">{caseStudy.kicker}</span>
        </div>
        {/* the title lives on the image; keep it in the document for screen readers */}
        <h2 className="sr-only">{caseStudy.title}</h2>
      </Reveal>

      {/* title image (faces removed for privacy) */}
      <Reveal delay={0.05}>
        <figure className="mt-6">
          <div className="overflow-hidden rounded-sm bg-paper-2 ring-1 ring-line-2">
            <img
              src={caseStudy.photo}
              alt={caseStudy.title}
              loading="lazy"
              className="w-full"
            />
          </div>
          <figcaption className="mt-3 text-[12px] uppercase tracking-[0.16em] text-faint">
            {caseStudy.photoCaption}
          </figcaption>
        </figure>
      </Reveal>

      {/* intro */}
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-graphite">{caseStudy.intro}</p>
      </Reveal>

      {/* headline stats */}
      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
        {caseStudy.stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col bg-paper p-6">
              <div className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-3 text-[13px] leading-snug text-muted">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <ResearchPipeline />

      {/* narrative */}
      <div className="mt-16 space-y-12">
        {caseStudy.sections.map((sec, i) => (
          <Reveal key={sec.label} delay={i * 0.05}>
            <div className="grid gap-4 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <div className="eyebrow">{sec.label}</div>
                <h3 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight text-ink">
                  {sec.heading}
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="leading-relaxed text-muted md:text-[15px]">{sec.body}</p>
                {sec.label === MEASURE_LABEL && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caseStudy.factors.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-line-2 px-3 py-1 text-xs font-medium text-graphite"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* phase chart */}
      <Reveal>
        <div className="mt-16 border-t border-line pt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-serif text-2xl font-medium tracking-tight text-ink">
              How the daily score moved.
            </h3>
            <span className="text-[12px] uppercase tracking-[0.16em] text-faint">
              Average daily score, out of 5
            </span>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-14">
            {caseStudy.phases.map((p) => (
              <div key={p.name} className="flex flex-col">
                <div className="flex h-52 items-end">
                  <div
                    className="relative w-full bg-ink"
                    style={{ height: `${(p.value / SCALE_MAX) * 100}%` }}
                  >
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 font-serif text-2xl font-medium text-ink">
                      {p.value.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 border-t border-line-2 pt-3">
                  <div className="text-sm font-medium text-ink">{p.name}</div>
                  <div className="text-[12px] text-faint">{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* how we know it held up */}
      <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {caseStudy.rigor.map((r, i) => (
          <Reveal key={r.value} delay={i * 0.06} className="h-full">
            <div className="flex h-full items-baseline gap-4 bg-paper p-6">
              <div className="whitespace-nowrap font-serif text-3xl font-medium text-ink">
                {r.value}
              </div>
              <div className="text-[13px] leading-snug text-muted">{r.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* outcome */}
      <Reveal>
        <div className="mt-14 rounded-sm bg-ink-2 p-8 text-paper sm:p-12">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-paper/55">
            Outcome
          </div>
          <h3 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            {caseStudy.impact.heading}
          </h3>
          <p className="mt-5 max-w-2xl leading-relaxed text-paper/75">{caseStudy.impact.body}</p>
        </div>
      </Reveal>

      {/* links */}
      <Reveal>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {caseStudy.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              <span className="link-underline">{l.label}</span>
              <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
