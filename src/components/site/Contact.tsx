"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/data/content";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto w-full max-w-4xl text-center text-paper">
      <Reveal>
        <div className="mx-auto flex w-fit items-center gap-4">
          <span className="h-px w-10 bg-paper/25" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-paper/55">
            Contact
          </span>
          <span className="h-px w-10 bg-paper/25" />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-8 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
          Open to your next data
          <br className="hidden sm:block" /> or developer hire.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-paper/70">
          Open to Data Analyst, Data Developer, BI Analyst, and Analytics Engineer roles,
          full-time or contract. Based in {profile.location}, open to remote.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-paper/85"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
          >
            Connect on LinkedIn
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-12 flex items-center justify-center gap-8 text-paper/55">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200 hover:text-paper"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200 hover:text-paper"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </Reveal>

      <p className="mt-14 text-xs tracking-wide text-paper/35">
        © {year} {profile.name} · New York
      </p>
    </div>
  );
}
