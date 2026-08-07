import { render, screen } from "@testing-library/react";

import type { PeepExpression } from "./peep-bust";
import {
  PeepStanding,
  type PeepStandingHead,
  type PeepStandingPose,
} from "./peep-standing";

const availableHeads = [
  "bun",
  "bantu-knots",
  "beanie",
  "gray-medium",
  "afro",
  "cornrows",
  "hijab",
  "mohawk",
  "pomp",
  "twists",
  "bangs",
  "buns",
  "long-afro",
  "long-curly",
  "turban",
  "cap",
] satisfies PeepStandingHead[];

const availableExpressions = [
  "smile",
  "smile-big",
  "laugh",
  "loving-grin",
  "awe",
  "angry",
  "calm",
  "cheeky",
  "concerned",
  "cute",
  "explaining",
  "fear",
  "serious",
  "suspicious",
  "tired",
  "eyes-closed",
] satisfies PeepExpression[];

const availablePoses = [
  "resting",
  "crossed-arms",
  "pointing",
  "walking",
  "robot-dance",
  "easing",
  "blazer",
  "shirt",
] satisfies PeepStandingPose[];

describe("PeepStanding", () => {
  it("renderiza pose y rostro como capas accesibles", () => {
    const { container } = render(
      <PeepStanding
        pose="pointing"
        head="mohawk"
        outfit="dark-top"
        expression="smile"
        accessory="glasses"
        blink="off"
        title="Persona señalando"
      />,
    );

    expect(screen.getByRole("img", { name: "Persona señalando" })).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-peep-head",
      "mohawk",
    );
    expect(container.querySelector('[data-peep-layer="head"]')).toBeInTheDocument();
    expect(container.querySelector('[data-peep-layer="pose"]')).toHaveAttribute(
      "data-peep-outfit",
      "dark-top",
    );
    expect(container.querySelectorAll("image")).toHaveLength(4);
  });

  it("es decorativo cuando no recibe título", () => {
    const { container } = render(<PeepStanding blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveAttribute("data-peep-pose", "walking");
    expect(container.querySelector('[data-peep-layer="pose"]')).toHaveAttribute(
      "data-peep-outfit",
      "dark-top",
    );
  });

  it.each(availableHeads)("renderiza la cabeza %s", (head) => {
    const { container } = render(<PeepStanding head={head} blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute("data-peep-head", head);
    expect(container.querySelector('[data-peep-layer="head"]')).toBeInTheDocument();
  });

  it.each(availableExpressions)("renderiza la expresión %s", (expression) => {
    const { container } = render(
      <PeepStanding expression={expression} blink="off" />,
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it.each(availablePoses)("renderiza la pose original %s", (pose) => {
    const { container } = render(<PeepStanding pose={pose} blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute("data-peep-pose", pose);
    expect(container.querySelector('[data-peep-layer="pose"]')).toBeInTheDocument();
  });
});
