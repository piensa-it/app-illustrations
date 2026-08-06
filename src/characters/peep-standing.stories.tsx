import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryMotion } from "../docs/story-motion";

import {
  PeepStanding,
  type PeepStandingPose,
  type PeepStandingVariant,
} from "./peep-standing";
import type { PeepAccessory, PeepExpression } from "./peep-bust";
import "./peep-bust.stories.css";

const poses: Array<{ value: PeepStandingPose; label: string }> = [
  { value: "resting", label: "En reposo" },
  { value: "crossed-arms", label: "Brazos cruzados" },
  { value: "pointing", label: "Señalando" },
  { value: "walking", label: "Caminando" },
  { value: "robot-dance", label: "Robot dance" },
];

const variants: Array<{ value: PeepStandingVariant; label: string }> = [
  { value: "classic", label: "Clásico" },
  { value: "creative", label: "Creativo" },
  { value: "casual", label: "Casual" },
  { value: "mentor", label: "Mentor" },
  { value: "coffee", label: "Café" },
];

const expressions: Array<{ value: PeepExpression; label: string }> = [
  { value: "smile", label: "Sonrisa" },
  { value: "awe", label: "Asombro" },
  { value: "concerned", label: "Preocupación" },
  { value: "serious", label: "Seriedad" },
];

const accessories: Array<{ value: PeepAccessory; label: string }> = [
  { value: "none", label: "Sin accesorio" },
  { value: "glasses", label: "Anteojos" },
  { value: "round-glasses", label: "Anteojos redondos" },
  { value: "sunglasses", label: "Gafas de sol" },
];

function StandingLab() {
  const [pose, setPose] = useState<PeepStandingPose>("pointing");
  const [variant, setVariant] = useState<PeepStandingVariant>("creative");
  const [expression, setExpression] = useState<PeepExpression>("smile");
  const [accessory, setAccessory] = useState<PeepAccessory>("none");
  const [paused, setPaused] = useState(false);

  return (
    <main className="peep-lab">
      <section className="peep-lab__stage" aria-label="Vista previa de cuerpo completo">
        <StoryMotion className="peep-lab__figure" motion="enter" paused={paused}>
          <PeepStanding
            pose={pose}
            variant={variant}
            expression={expression}
            accessory={accessory}
            paused={paused}
            title="Personaje de cuerpo completo"
          />
        </StoryMotion>
      </section>

      <section className="peep-lab__panel">
        <p className="peep-lab__eyebrow">Laboratorio · prototipo 02</p>
        <h1>Cambia su lenguaje corporal.</h1>
        <p className="peep-lab__description">
          Las poses son dibujos completos intercambiables; rostro, cabeza y
          accesorios permanecen como capas independientes.
        </p>

        <fieldset>
          <legend>Pose</legend>
          <div className="peep-lab__choices">
            {poses.map((item) => (
              <button key={item.value} type="button" aria-pressed={pose === item.value} onClick={() => setPose(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Personaje</legend>
          <div className="peep-lab__choices">
            {variants.map((item) => (
              <button key={item.value} type="button" aria-pressed={variant === item.value} onClick={() => setVariant(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Expresión</legend>
          <div className="peep-lab__choices">
            {expressions.map((item) => (
              <button key={item.value} type="button" aria-pressed={expression === item.value} onClick={() => setExpression(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Accesorio</legend>
          <div className="peep-lab__choices">
            {accessories.map((item) => (
              <button key={item.value} type="button" aria-pressed={accessory === item.value} onClick={() => setAccessory(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="peep-lab__actions">
          <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
            {paused ? "Reanudar" : "Pausar"}
          </button>
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Laboratorio/Personaje de cuerpo completo",
  component: PeepStanding,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", controls: { disable: true } },
} satisfies Meta<typeof PeepStanding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PosesInteractivas: Story = { render: () => <StandingLab /> };
export const ComponenteBase: Story = {
  args: {
    pose: "pointing",
    variant: "creative",
    expression: "smile",
    accessory: "round-glasses",
    title: "Persona señalando",
    style: { width: 220 },
  },
};
