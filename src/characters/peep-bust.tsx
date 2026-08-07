import { useId } from "react";

import type { IllustrationProps } from "../types";

import bodySource from "../../assets/source/open-peeps/Separate Atoms/body/Tee 1.svg?raw";
import headSource from "../../assets/source/open-peeps/Separate Atoms/head/Bun 2.svg?raw";
import blazerBodySource from "../../assets/source/open-peeps/Separate Atoms/body/Blazer Black Tee.svg?raw";
import dressBodySource from "../../assets/source/open-peeps/Separate Atoms/body/Dress.svg?raw";
import whateverBodySource from "../../assets/source/open-peeps/Separate Atoms/body/Whatever.svg?raw";
import coffeeBodySource from "../../assets/source/open-peeps/Separate Atoms/body/Coffee.svg?raw";
import bantuKnotsHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Bantu Knots.svg?raw";
import grayMediumHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/Gray Medium.svg?raw";
import beanieHeadSource from "../../assets/source/open-peeps/Separate Atoms/head/hat-beanie.svg?raw";
import aweSource from "../../assets/source/open-peeps/Separate Atoms/face/Awe.svg?raw";
import angrySource from "../../assets/source/open-peeps/Separate Atoms/face/Angry with Fang.svg?raw";
import calmSource from "../../assets/source/open-peeps/Separate Atoms/face/Calm.svg?raw";
import cheekySource from "../../assets/source/open-peeps/Separate Atoms/face/Cheeky.svg?raw";
import concernedSource from "../../assets/source/open-peeps/Separate Atoms/face/Concerned.svg?raw";
import cuteSource from "../../assets/source/open-peeps/Separate Atoms/face/Cute.svg?raw";
import closedEyesSource from "../../assets/source/open-peeps/Separate Atoms/face/Eyes Closed.svg?raw";
import explainingSource from "../../assets/source/open-peeps/Separate Atoms/face/Explaining.svg?raw";
import fearSource from "../../assets/source/open-peeps/Separate Atoms/face/Fear.svg?raw";
import lovingGrinSource from "../../assets/source/open-peeps/Separate Atoms/face/Loving Grin 1.svg?raw";
import seriousSource from "../../assets/source/open-peeps/Separate Atoms/face/Serious.svg?raw";
import smileBigSource from "../../assets/source/open-peeps/Separate Atoms/face/Smile Big.svg?raw";
import smileLolSource from "../../assets/source/open-peeps/Separate Atoms/face/Smile LOL.svg?raw";
import smileSource from "../../assets/source/open-peeps/Separate Atoms/face/Smile.svg?raw";
import suspiciousSource from "../../assets/source/open-peeps/Separate Atoms/face/Suspicious.svg?raw";
import tiredSource from "../../assets/source/open-peeps/Separate Atoms/face/Tired.svg?raw";
import eyepatchSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Eyepatch.svg?raw";
import glassesTwoSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 2.svg?raw";
import glassesThreeSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 3.svg?raw";
import glassesSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses.svg?raw";
import glassesFourSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 4.svg?raw";
import glassesFiveSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Glasses 5.svg?raw";
import sunglassesTwoSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Sunglasses 2.svg?raw";
import sunglassesSource from "../../assets/source/open-peeps/Separate Atoms/accessories/Sunglasses.svg?raw";

import "./peep-bust.css";
import { SvgLayer } from "./svg-layer";
import { usePeepBlink } from "./use-peep-blink";

export type PeepExpression =
  | "smile"
  | "smile-big"
  | "laugh"
  | "loving-grin"
  | "awe"
  | "angry"
  | "calm"
  | "cheeky"
  | "concerned"
  | "cute"
  | "explaining"
  | "fear"
  | "serious"
  | "suspicious"
  | "tired"
  | "eyes-closed";

export type PeepAccessory =
  | "none"
  | "eyepatch"
  | "glasses"
  | "square-glasses"
  | "half-rim-glasses"
  | "round-glasses"
  | "wide-glasses"
  | "sunglasses"
  | "sport-sunglasses";

export type PeepBlink = "auto" | "off";

export type PeepBustVariant = "classic" | "creative" | "casual" | "mentor" | "coffee";

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

const expressionSources: Record<PeepExpression, string> = {
  smile: smileSource,
  "smile-big": smileBigSource,
  laugh: smileLolSource,
  "loving-grin": lovingGrinSource,
  awe: aweSource,
  angry: angrySource,
  calm: calmSource,
  cheeky: cheekySource,
  concerned: concernedSource,
  cute: cuteSource,
  explaining: explainingSource,
  fear: fearSource,
  serious: seriousSource,
  suspicious: suspiciousSource,
  tired: tiredSource,
  "eyes-closed": closedEyesSource,
};

const accessorySources: Record<Exclude<PeepAccessory, "none">, string> = {
  eyepatch: eyepatchSource,
  glasses: glassesSource,
  "square-glasses": glassesTwoSource,
  "half-rim-glasses": glassesThreeSource,
  "round-glasses": glassesFourSource,
  "wide-glasses": glassesFiveSource,
  sunglasses: sunglassesSource,
  "sport-sunglasses": sunglassesTwoSource,
};

const variantUrls: Record<
  PeepBustVariant,
  { body: string; head: string }
> = {
  classic: { body: bodySource, head: headSource },
  creative: { body: dressBodySource, head: bantuKnotsHeadSource },
  casual: { body: blazerBodySource, head: beanieHeadSource },
  mentor: { body: whateverBodySource, head: grayMediumHeadSource },
  coffee: { body: coffeeBodySource, head: headSource },
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

  const faceSource = expressionSources[expression];
  const variantLayers = variantUrls[variant];
  const accessorySource = accessory === "none" ? null : accessorySources[accessory];
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
      <SvgLayer
        source={variantLayers.body}
        viewBox="0 0 818 733"
        x={147}
        y={639}
        width={818}
        height={733}
        layer="body"
      />
      <SvgLayer
        className="peep-bust__head"
        source={variantLayers.head}
        viewBox="0 0 473 567"
        x={372}
        y={180}
        width={473}
        height={567}
        layer="head"
      />
      {!closedByExpression && (
        <SvgLayer
          className="peep-bust__face"
          source={faceSource}
          viewBox="0 0 289 293"
          x={531}
          y={366}
          width={289}
          height={293}
          layer="face"
        />
      )}
      <SvgLayer
        className="peep-bust__closed-eyes"
        source={closedEyesSource}
        viewBox="0 0 289 293"
        x={531}
        y={366}
        width={289}
        height={293}
        layer="closed-eyes"
      />
      {accessorySource && (
        <SvgLayer
          className="peep-bust__accessory"
          source={accessorySource}
          viewBox="0 0 392 138"
          x={419}
          y={421}
          width={392}
          height={138}
          layer="accessory"
        />
      )}
    </svg>
  );
}
