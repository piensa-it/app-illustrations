import { useId } from "react";

import type { IllustrationProps } from "../types";

import bodyUrl from "../../assets/source/open-peeps/Separate Atoms/body/Tee 1.svg?url";
import headUrl from "../../assets/source/open-peeps/Separate Atoms/head/Bun 2.svg?url";
import blazerBodyUrl from "../../assets/source/open-peeps/Separate Atoms/body/Blazer Black Tee.svg?url";
import dressBodyUrl from "../../assets/source/open-peeps/Separate Atoms/body/Dress.svg?url";
import whateverBodyUrl from "../../assets/source/open-peeps/Separate Atoms/body/Whatever.svg?url";
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

import "./peep-bust.css";
import { usePeepBlink } from "./use-peep-blink";

export type PeepExpression =
  | "smile"
  | "awe"
  | "concerned"
  | "serious"
  | "eyes-closed";

export type PeepAccessory =
  | "none"
  | "glasses"
  | "round-glasses"
  | "sunglasses";

export type PeepBlink = "auto" | "off";

export type PeepBustVariant = "classic" | "creative" | "casual" | "mentor";

export interface PeepBustProps extends IllustrationProps {
  /** Combinación base de cuerpo y cabeza. */
  variant?: PeepBustVariant;
  /** Expresión visible del personaje. */
  expression?: PeepExpression;
  /** Accesorio que se coloca sobre el rostro. */
  accessory?: PeepAccessory;
  /** Activa el parpadeo ambiental. Respeta `prefers-reduced-motion`. */
  blink?: PeepBlink;
  /** Detiene comportamientos ambientales sin cambiar la composición. */
  paused?: boolean;
}

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

const variantUrls: Record<
  PeepBustVariant,
  { body: string; head: string }
> = {
  classic: { body: bodyUrl, head: headUrl },
  creative: { body: dressBodyUrl, head: bantuKnotsHeadUrl },
  casual: { body: blazerBodyUrl, head: beanieHeadUrl },
  mentor: { body: whateverBodyUrl, head: grayMediumHeadUrl },
};

export function PeepBust({
  variant = "classic",
  expression = "smile",
  accessory = "none",
  blink = "auto",
  paused = false,
  title,
  ...svgProps
}: PeepBustProps) {
  const titleId = useId();
  const isBlinking = usePeepBlink({
    enabled: blink === "auto" && !paused && expression !== "eyes-closed",
  });

  const faceUrl = expressionUrls[expression];
  const variantLayers = variantUrls[variant];
  const accessoryUrl = accessory === "none" ? null : accessoryUrls[accessory];
  const closedByExpression = expression === "eyes-closed";

  return (
    <svg
      {...svgProps}
      className={["peep-bust", svgProps.className].filter(Boolean).join(" ")}
      viewBox="0 0 1136 1533"
      role={title ? "img" : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      data-blinking={isBlinking || closedByExpression}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title id={titleId}>{title}</title>}
      <image
        href={variantLayers.body}
        x="147"
        y="639"
        width="818"
        height="733"
      />
      <image
        href={variantLayers.head}
        x="372"
        y="180"
        width="473"
        height="567"
      />
      {!closedByExpression && (
        <image
          className="peep-bust__face"
          href={faceUrl}
          opacity={isBlinking ? 0 : 1}
          x="531"
          y="366"
          width="289"
          height="293"
        />
      )}
      <image
        className="peep-bust__closed-eyes"
        href={closedEyesUrl}
        opacity={isBlinking || closedByExpression ? 1 : 0}
        x="531"
        y="366"
        width="289"
        height="293"
      />
      {accessoryUrl && (
        <image
          className="peep-bust__accessory"
          href={accessoryUrl}
          x="419"
          y="421"
          width="392"
          height="138"
        />
      )}
    </svg>
  );
}
