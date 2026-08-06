import { render, screen } from "@testing-library/react";

import { PeepBust } from "./peep-bust";

describe("PeepBust", () => {
  it("renderiza una ilustración accesible cuando recibe título", () => {
    render(<PeepBust title="Persona sonriente" blink="off" />);

    expect(
      screen.getByRole("img", { name: "Persona sonriente" }),
    ).toBeInTheDocument();
  });

  it("se considera decorativa cuando no recibe título", () => {
    const { container } = render(<PeepBust blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("permite seleccionar una variante de busto", () => {
    const { container } = render(
      <PeepBust variant="creative" title="Personaje creativo" blink="off" />,
    );

    expect(container.querySelectorAll("image")).toHaveLength(4);
    expect(
      screen.getByRole("img", { name: "Personaje creativo" }),
    ).toBeInTheDocument();
  });
});
