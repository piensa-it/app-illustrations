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

    expect(container.querySelector('[data-peep-layer="head"]')).toBeInTheDocument();
    expect(container.querySelector('[data-peep-layer="body"]')).toBeInTheDocument();
    expect(container.querySelector('[data-peep-layer="face"]')).toBeInTheDocument();
    expect(container.querySelectorAll("image")).toHaveLength(0);
    expect(
      screen.getByRole("img", { name: "Personaje creativo" }),
    ).toBeInTheDocument();
  });

  it("expone la animación mediante data-animation", () => {
    const { container } = render(<PeepBust animation="loading" blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "data-animation",
      "loading",
    );
  });

  it("no expone data-animation cuando es none (por defecto)", () => {
    const { container } = render(<PeepBust blink="off" />);

    expect(container.querySelector("svg")).not.toHaveAttribute("data-animation");
  });

  it("marca data-paused cuando paused está activo", () => {
    const { container } = render(
      <PeepBust animation="float" paused blink="off" />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("data-paused", "true");
  });
});
