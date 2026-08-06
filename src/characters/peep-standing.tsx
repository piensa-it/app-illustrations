import { useId } from "react";

import type { IllustrationProps } from "../types";
import type {
  PeepAccessory,
  PeepBlink,
  PeepBustVariant,
  PeepExpression,
} from "./peep-bust";
import { usePeepBlink } from "./use-peep-blink";

import crossedArmsUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/crossed_arms-1.svg?url";
import pointingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/pointing_finger-1.svg?url";
import restingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/resting-1.svg?url";
import robotDanceUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/robot_dance-1.svg?url";
import walkingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/walking-1.svg?url";
import bunHeadUrl from "../../assets/source/open-peeps/Separate Atoms/head/Bun 2.svg?url";
import bantuKnotsHeadUrl from "../../assets/source/open-peeps/Separate Atoms/head/Bantu Knots.svg?url";
import grayMediumHeadUrl from "../../assets/source/open-peeps/Separate Atoms/head/Gray Medium.svg?url";
import beanieHeadUrl from "../../assets/source/open-peeps/Separate Atoms/head/hat-beanie.svg?url";
import aweUrl from "../../assets/source/open-peeps/Separate Atoms/face/Awe.svg?url";
import concernedUrl from "../../assets/source/open-peeps/Separate Atoms/face/Concerned.svg?url";
import closedEyesUrl from "../../assets/source/open-peeps/Separate Atoms/face/Eyes Closed.svg?url";
import seriousUrl from "../../assets/source/open-peeps/Separate Atoms/face/Serious.svg?url";
import smileUrl from "../../assets/source/open-peeps/Separate Atoms/face/Smile.svg?url";
import glassesUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses.svg?url";
import glassesFourUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 4.svg?url";
import sunglassesUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Sunglasses.svg?url";

import "./peep-standing.css";

export type PeepStandingVariant = PeepBustVariant;
export type PeepStandingPose =
  | "resting"
  | "crossed-arms"
  | "pointing"
  | "walking"
  | "robot-dance";

export interface PeepStandingProps extends IllustrationProps {
  variant?: PeepStandingVariant;
  pose?: PeepStandingPose;
  expression?: PeepExpression;
  accessory?: PeepAccessory;
  blink?: PeepBlink;
  paused?: boolean;
}

const poseUrls: Record<PeepStandingPose, string> = {
  resting: restingUrl,
  "crossed-arms": crossedArmsUrl,
  pointing: pointingUrl,
  walking: walkingUrl,
  "robot-dance": robotDanceUrl,
};

const headUrls: Record<PeepStandingVariant, string> = {
  classic: bunHeadUrl,
  creative: bantuKnotsHeadUrl,
  casual: beanieHeadUrl,
  mentor: grayMediumHeadUrl,
};

const expressionUrls: Record<PeepExpression, string> = {
  smile: smileUrl,
  awe: aweUrl,
  concerned: concernedUrl,
  serious: seriousUrl,
  "eyes-closed": closedEyesUrl,
};

const accessoryUrls: Record<Exclude<PeepAccessory, "none">, string> = {
  glasses: glassesUrl,
  "round-glasses": glassesFourUrl,
  sunglasses: sunglassesUrl,
};

export function PeepStanding({
  variant = "classic",
  pose = "resting",
  expression = "smile",
  accessory = "none",
  blink = "auto",
  paused = false,
  title,
  ...svgProps
}: PeepStandingProps) {
  const titleId = useId();
  const closedByExpression = expression === "eyes-closed";
  const isBlinking = usePeepBlink({
    enabled: blink === "auto" && !paused && !closedByExpression,
  });
  const accessoryUrl = accessory === "none" ? null : accessoryUrls[accessory];

  return (
    <svg
      {...svgProps}
      className={["peep-standing", svgProps.className].filter(Boolean).join(" ")}
      viewBox="0 0 1179 3291"
      role={title ? "img" : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title id={titleId}>{title}</title>}
      <image
        className="peep-standing__pose"
        href={poseUrls[pose]}
        x="-121"
        y="634"
        width="1645"
        height="2500"
      />
      <image
        className="peep-standing__head"
        href={headUrls[variant]}
        x="404"
        y="180"
        width="473"
        height="567"
      />
      {!closedByExpression && (
        <image
          className="peep-standing__face"
          href={expressionUrls[expression]}
          opacity={isBlinking ? 0 : 1}
          x="563"
          y="366"
          width="289"
          height="293"
        />
      )}
      <image
        className="peep-standing__closed-eyes"
        href={closedEyesUrl}
        opacity={isBlinking || closedByExpression ? 1 : 0}
        x="563"
        y="366"
        width="289"
        height="293"
      />
      {accessoryUrl && (
        <image
          className="peep-standing__accessory"
          href={accessoryUrl}
          x="451"
          y="421"
          width="392"
          height="138"
        />
      )}
    </svg>
  );
}
