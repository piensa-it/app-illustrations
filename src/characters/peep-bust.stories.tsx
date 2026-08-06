import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Illustration,
  type MotionPreset,
} from "@piensa-it/ui-library";
import "@piensa-it/ui-library/styles.css";

import {
  PeepBust,
  type PeepAccessory,
  type PeepBustVariant,
  type PeepExpression,
} from "./peep-bust";
import "./peep-bust.stories.css";

const expressions: Array<{ value: PeepExpression; label: string }> = [
  { value: "smile", label: "Sonrisa" },
  { value: "awe", label: "Asombro" },
  { value: "concerned", label: "Preocupación" },
  { value: "serious", label: "Seriedad" },
  { value: "eyes-closed", label: "Ojos cerrados" },
];

const accessories: Array<{ value: PeepAccessory; label: string }> = [
  { value: "none", label: "Sin accesorio" },
  { value: "glasses", label: "Anteojos" },
  { value: "round-glasses", label: "Anteojos redondos" },
  { value: "sunglasses", label: "Gafas de sol" },
];

type LabMotion = MotionPreset | "none";

const variants: Array<{ value: PeepBustVariant; label: string }> = [
  { value: "classic", label: "Clásico" },
  { value: "creative", label: "Creativo" },
  { value: "casual", label: "Casual" },
  { value: "mentor", label: "Mentor" },
];

function InteractivePeepLab() {
  const [variant, setVariant] = useState<PeepBustVariant>("classic");
  const [expression, setExpression] = useState<PeepExpression>("smile");
  const [accessory, setAccessory] = useState<PeepAccessory>("glasses");
  const [blink, setBlink] = useState(true);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState<LabMotion>("float");
  const [motionKey, setMotionKey] = useState(0);

  const playMotion = (nextMotion: LabMotion) => {
    setMotion(nextMotion);
    setMotionKey((current) => current + 1);
  };

  return (
    <main className="peep-lab">
      <section className="peep-lab__stage" aria-label="Vista previa del personaje">
        <Illustration
          className="peep-lab__figure"
          size="full"
          motion={motion}
          paused={paused}
          key={motionKey}
        >
          <PeepBust
            variant={variant}
            expression={expression}
            accessory={accessory}
            blink={blink ? "auto" : "off"}
            paused={paused}
            title="Personaje de demostración"
          />
        </Illustration>
      </section>

      <section className="peep-lab__panel">
        <p className="peep-lab__eyebrow">Laboratorio · prototipo 01</p>
        <h1>Dale una reacción.</h1>
        <p className="peep-lab__description">
          Combina el rostro y los accesorios, observa el parpadeo automático y
          prueba movimientos ambientales. Las piezas siguen siendo SVG reales.
        </p>

        <fieldset>
          <legend>Personaje</legend>
          <div className="peep-lab__choices">
            {variants.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={variant === item.value}
                onClick={() => setVariant(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Expresión</legend>
          <div className="peep-lab__choices">
            {expressions.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={expression === item.value}
                onClick={() => setExpression(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Accesorio</legend>
          <div className="peep-lab__choices">
            {accessories.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={accessory === item.value}
                onClick={() => setAccessory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Comportamiento</legend>
          <div className="peep-lab__choices">
            <button
              type="button"
              aria-pressed={blink}
              onClick={() => setBlink((current) => !current)}
            >
              Parpadeo automático
            </button>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              Pausar
            </button>
          </div>
        </fieldset>

        <div className="peep-lab__actions" aria-label="Probar movimientos">
          <button type="button" onClick={() => playMotion("enter")}>
            Entrar
          </button>
          <button type="button" onClick={() => playMotion("float")}>
            Flotar
          </button>
          <button type="button" onClick={() => playMotion("point")}>
            Señalar
          </button>
          <button type="button" onClick={() => playMotion("celebrate")}>
            Celebrar
          </button>
          <button type="button" onClick={() => playMotion("warn")}>
            Advertir
          </button>
          <button type="button" onClick={() => playMotion("none")}>
            Quieto
          </button>
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Laboratorio/Personaje interactivo",
  component: PeepBust,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PeepBust>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrototipoDeBusto: Story = {
  render: () => <InteractivePeepLab />,
};

export const ComponenteBase: Story = {
  args: {
    variant: "creative",
    expression: "smile",
    accessory: "round-glasses",
    blink: "auto",
    title: "Personaje sonriente con anteojos",
    style: { width: 360 },
  },
};
