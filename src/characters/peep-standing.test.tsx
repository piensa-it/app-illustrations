import { render, screen } from "@testing-library/react";

import { PeepStanding } from "./peep-standing";

describe("PeepStanding", () => {
  it("renderiza pose y rostro como capas accesibles", () => {
    const { container } = render(
      <PeepStanding
        pose="pointing"
        expression="smile"
        accessory="glasses"
        blink="off"
        title="Persona señalando"
      />,
    );

    expect(screen.getByRole("img", { name: "Persona señalando" })).toBeInTheDocument();
    expect(container.querySelector('[data-peep-layer="head"]')).toBeInTheDocument();
    expect(container.querySelectorAll("image")).toHaveLength(4);
  });

  it("es decorativo cuando no recibe título", () => {
    const { container } = render(<PeepStanding blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
