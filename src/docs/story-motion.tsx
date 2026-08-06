import type { HTMLAttributes, ReactNode } from "react";

import "./story-motion.css";

export type StoryMotionPreset =
  | "none"
  | "enter"
  | "float"
  | "point"
  | "celebrate"
  | "warn";

interface StoryMotionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  motion?: StoryMotionPreset;
  paused?: boolean;
}

/** Adaptador exclusivo de Storybook; las primitivas públicas viven en app-ui. */
export function StoryMotion({
  children,
  className,
  motion = "none",
  paused = false,
  ...props
}: StoryMotionProps) {
  return (
    <div
      {...props}
      className={["story-motion", className].filter(Boolean).join(" ")}
      data-motion={motion}
      data-paused={paused || undefined}
    >
      {children}
    </div>
  );
}

