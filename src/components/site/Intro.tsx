"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { TextScramble } from "@/components/ui/text-scramble";
import { Reveal } from "@/components/site/Reveal";
import { about, profile } from "@/data/content";

export function Intro() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <>
      {/* TOP THIRD */}
      <div className="flex flex-[1] flex-col items-center justify-center text-center">
        <motion.p {...fade(0.1)} className="eyebrow">
          {profile.role} &nbsp;·&nbsp; {profile.location}
        </motion.p>
        <TextScramble
          as="h1"
          duration={1.15}
          speed={0.035}
          className="mt-8 font-serif text-[4rem] font-medium leading-[0.88] tracking-tight text-ink sm:text-[6.5rem] md:text-[8rem]"
        >
          Jean Batista
        </TextScramble>
      </div>

      {/* BOTTOM TWO-THIRDS — about + headshot */}
      <div className="flex flex-[2] items-start border-t border-line/70 pt-10 md:pt-14">
        <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-12 md:gap-12">
          {/* headshot + facts + socials */}
          <Reveal className="md:col-span-4">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="aspect-square w-32 overflow-hidden rounded-full ring-1 ring-line-2 sm:w-40">
                <img
                  src={profile.photo}
                  alt="Jean Batista"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <ul className="mt-5 space-y-1.5">
                {about.facts.map((f) => (
                  <li key={f} className="text-[13px] leading-snug text-faint">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-5 text-faint">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* bio */}
          <div className="md:col-span-8">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="eyebrow whitespace-nowrap">About</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <p className="mt-5 font-serif text-[1.6rem] font-medium leading-snug tracking-tight text-ink sm:text-[1.9rem]">
                <span className="text-graphite">{about.greeting}</span> {about.lead}
              </p>
            </Reveal>
            <div className="mt-5 space-y-3.5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * (i + 1)}>
                  <p className="text-[15px] leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a href="#work" className="text-sm font-medium text-ink">
                  <span className="link-underline">View selected work</span>
                  <span aria-hidden> →</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm font-medium text-faint transition-colors duration-200 hover:text-ink"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
