import { useId } from "react";

import type { IllustrationProps } from "../types";
import type {
  PeepAccessory,
  PeepBlink,
  PeepBustVariant,
  PeepExpression,
} from "./peep-bust";
import { usePeepBlink } from "./use-peep-blink";
import { SvgLayer } from "./svg-layer";

import crossedArmsUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/crossed_arms-1.svg?url";
import crossedArmsDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/crossed_arms-2.svg?url";
import blazerUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/blazer-1.svg?url";
import blazerDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/blazer-2.svg?url";
import easingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/easing-1.svg?url";
import easingDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/easing-2.svg?url";
import pointingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/pointing_finger-1.svg?url";
import pointingDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/pointing_finger-2.svg?url";
import restingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/resting-1.svg?url";
import restingDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/resting-2.svg?url";
import robotDanceUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/robot_dance-1.svg?url";
import robotDanceDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/robot_dance-2.svg?url";
import shirtUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/shirt-1.svg?url";
import shirtDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/shirt-2.svg?url";
import walkingUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/walking-1.svg?url";
import walkingDarkUrl from "../../assets/source/open-peeps/Separate Atoms/pose/standing/walking-2.svg?url";
import bunHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Bun 2.svg?raw";
import bantuKnotsHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Bantu Knots.svg?raw";
import grayMediumHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Gray Medium.svg?raw";
import beanieHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/hat-beanie.svg?raw";
import afroHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Afro.svg?raw";
import cornrowsHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Cornrows.svg?raw";
import hijabHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Hijab.svg?raw";
import mohawkHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Mohawk.svg?raw";
import pompHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Pomp.svg?raw";
import twistsHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Twists.svg?raw";
import bangsHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Bangs.svg?raw";
import bunsHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Buns.svg?raw";
import longAfroHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Long Afro.svg?raw";
import longCurlyHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Long Curly.svg?raw";
import turbanHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Turban.svg?raw";
import capHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/hat-hip.svg?raw";
import aweUrl from "../../assets/source/open-peeps/Separate Atoms/face/Awe.svg?url";
import angryUrl from "../../assets/source/open-peeps/Separate Atoms/face/Angry with Fang.svg?url";
import calmUrl from "../../assets/source/open-peeps/Separate Atoms/face/Calm.svg?url";
import cheekyUrl from "../../assets/source/open-peeps/Separate Atoms/face/Cheeky.svg?url";
import concernedUrl from "../../assets/source/open-peeps/Separate Atoms/face/Concerned.svg?url";
import cuteUrl from "../../assets/source/open-peeps/Separate Atoms/face/Cute.svg?url";
import closedEyesUrl from "../../assets/source/open-peeps/Separate Atoms/face/Eyes Closed.svg?url";
import explainingUrl from "../../assets/source/open-peeps/Separate Atoms/face/Explaining.svg?url";
import fearUrl from "../../assets/source/open-peeps/Separate Atoms/face/Fear.svg?url";
import lovingGrinUrl from "../../assets/source/open-peeps/Separate Atoms/face/Loving Grin 1.svg?url";
import seriousUrl from "../../assets/source/open-peeps/Separate Atoms/face/Serious.svg?url";
import smileBigUrl from "../../assets/source/open-peeps/Separate Atoms/face/Smile Big.svg?url";
import smileLolUrl from "../../assets/source/open-peeps/Separate Atoms/face/Smile LOL.svg?url";
import smileUrl from "../../assets/source/open-peeps/Separate Atoms/face/Smile.svg?url";
import suspiciousUrl from "../../assets/source/open-peeps/Separate Atoms/face/Suspicious.svg?url";
import tiredUrl from "../../assets/source/open-peeps/Separate Atoms/face/Tired.svg?url";
import eyepatchUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Eyepatch.svg?url";
import glassesTwoUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 2.svg?url";
import glassesThreeUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 3.svg?url";
import glassesUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses.svg?url";
import glassesFourUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 4.svg?url";
import glassesFiveUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 5.svg?url";
import sunglassesTwoUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Sunglasses 2.svg?url";
import sunglassesUrl from "../../assets/source/open-peeps/Separate Atoms/accessories/Sunglasses.svg?url";

import "./peep-standing.css";

export type PeepStandingVariant = PeepBustVariant;
export type PeepStandingOutfit = "light-top" | "dark-top";
export type PeepStandingHead =
  | "bun"
  | "bantu-knots"
  | "beanie"
  | "gray-medium"
  | "afro"
  | "cornrows"
  | "hijab"
  | "mohawk"
  | "pomp"
  | "twists"
  | "bangs"
  | "buns"
  | "long-afro"
  | "long-curly"
  | "turban"
  | "cap";
export type PeepStandingPose =
  | "resting"
  | "crossed-arms"
  | "pointing"
  | "walking"
  | "robot-dance"
  | "easing"
  | "blazer"
  | "shirt";

export interface PeepStandingProps extends IllustrationProps {
  /** @deprecated Usa `head` para elegir cabeza y cabello sin acoplarla al busto. */
  variant?: PeepStandingVariant;
  /** Cabeza y cabello del personaje. */
  head?: PeepStandingHead;
  pose?: PeepStandingPose;
  outfit?: PeepStandingOutfit;
  expression?: PeepExpression;
  accessory?: PeepAccessory;
  blink?: PeepBlink;
  paused?: boolean;
}

const poseUrls: Record<PeepStandingPose, Record<PeepStandingOutfit, string>> = {
  resting: { "light-top": restingUrl, "dark-top": restingDarkUrl },
  "crossed-arms": {
    "light-top": crossedArmsUrl,
    "dark-top": crossedArmsDarkUrl,
  },
  pointing: { "light-top": pointingUrl, "dark-top": pointingDarkUrl },
  walking: { "light-top": walkingUrl, "dark-top": walkingDarkUrl },
  "robot-dance": {
    "light-top": robotDanceUrl,
    "dark-top": robotDanceDarkUrl,
  },
  easing: { "light-top": easingUrl, "dark-top": easingDarkUrl },
  blazer: { "light-top": blazerDarkUrl, "dark-top": blazerUrl },
  shirt: { "light-top": shirtUrl, "dark-top": shirtDarkUrl },
};

const headSources: Record<PeepStandingHead, string> = {
  bun: bunHeadSource,
  "bantu-knots": bantuKnotsHeadSource,
  beanie: beanieHeadSource,
  "gray-medium": grayMediumHeadSource,
  afro: afroHeadSource,
  cornrows: cornrowsHeadSource,
  hijab: hijabHeadSource,
  mohawk: mohawkHeadSource,
  pomp: pompHeadSource,
  twists: twistsHeadSource,
  bangs: bangsHeadSource,
  buns: bunsHeadSource,
  "long-afro": longAfroHeadSource,
  "long-curly": longCurlyHeadSource,
  turban: turbanHeadSource,
  cap: capHeadSource,
};

const legacyVariantHeads: Record<PeepStandingVariant, PeepStandingHead> = {
  classic: "bun",
  creative: "bantu-knots",
  casual: "beanie",
  mentor: "gray-medium",
  coffee: "bun",
};

const expressionUrls: Record<PeepExpression, string> = {
  smile: smileUrl,
  "smile-big": smileBigUrl,
  laugh: smileLolUrl,
  "loving-grin": lovingGrinUrl,
  awe: aweUrl,
  angry: angryUrl,
  calm: calmUrl,
  cheeky: cheekyUrl,
  concerned: concernedUrl,
  cute: cuteUrl,
  explaining: explainingUrl,
  fear: fearUrl,
  serious: seriousUrl,
  suspicious: suspiciousUrl,
  tired: tiredUrl,
  "eyes-closed": closedEyesUrl,
};

const accessoryUrls: Record<Exclude<PeepAccessory, "none">, string> = {
  eyepatch: eyepatchUrl,
  glasses: glassesUrl,
  "square-glasses": glassesTwoUrl,
  "half-rim-glasses": glassesThreeUrl,
  "round-glasses": glassesFourUrl,
  "wide-glasses": glassesFiveUrl,
  sunglasses: sunglassesUrl,
  "sport-sunglasses": sunglassesTwoUrl,
};

export function PeepStanding({
  variant = "classic",
  head,
  pose = "walking",
  outfit = "dark-top",
  expression = "smile",
  accessory = "glasses",
  blink = "auto",
  paused = false,
  title,
  ...svgProps
}: PeepStandingProps) {
  const titleId = useId();
  const resolvedHead = head ?? legacyVariantHeads[variant];
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
      data-peep-head={resolvedHead}
      data-peep-pose={pose}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title id={titleId}>{title}</title>}
      <image
        className="peep-standing__pose"
        data-peep-layer="pose"
        data-peep-outfit={outfit}
        href={poseUrls[pose][outfit]}
        x="-121"
        y="634"
        width="1645"
        height="2500"
      />
      <SvgLayer
        className="peep-standing__head"
        source={headSources[resolvedHead]}
        viewBox="0 0 473 567"
        x={404}
        y={180}
        width={473}
        height={567}
        layer="head"
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
