"use client";

import { type ElementType, type JSX, useEffect, useMemo, useState } from "react";
import { motion, type MotionProps } from "framer-motion";

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = useMemo(
    () => motion.create(Component as keyof JSX.IntrinsicElements),
    [Component],
  );
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = children;

  useEffect(() => {
    setDisplayText(children);
  }, [children]);

  useEffect(() => {
    if (!trigger || isAnimating) return;

    setIsAnimating(true);
    const steps = duration / speed;
    let step = 0;

    const interval = window.setInterval(() => {
      let scrambled = "";
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
          continue;
        }

        scrambled +=
          progress * text.length > i
            ? text[i]
            : characterSet[Math.floor(Math.random() * characterSet.length)];
      }

      setDisplayText(scrambled);
      step += 1;

      if (step > steps) {
        window.clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);

    return () => window.clearInterval(interval);
  }, [characterSet, duration, isAnimating, onScrambleComplete, speed, text, trigger]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
