import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryControlAccordion } from "../docs/story-control-accordion";
import { adjacentStoryValue } from "../docs/story-control-utils";
import {
  StoryMotion,
  type StoryMotionPreset,
} from "../docs/story-motion";

import {
  PeepBust,
  type PeepAccessory,
  type PeepBustVariant,
  type PeepExpression,
} from "./peep-bust";
import "./peep-bust.stories.css";

const expressions: Array<{ value: PeepExpression; label: string }> = [
  { value: "smile", label: "Sonrisa" },
  { value: "smile-big", label: "Gran sonrisa" },
  { value: "laugh", label: "Carcajada" },
  { value: "loving-grin", label: "Encantado" },
  { value: "awe", label: "Asombro" },
  { value: "angry", label: "Enojo" },
  { value: "calm", label: "Calma" },
  { value: "cheeky", label: "Pícaro" },
  { value: "concerned", label: "Preocupación" },
  { value: "cute", label: "Ternura" },
  { value: "explaining", label: "Explicando" },
  { value: "fear", label: "Miedo" },
  { value: "serious", label: "Seriedad" },
  { value: "suspicious", label: "Sospecha" },
  { value: "tired", label: "Cansancio" },
  { value: "eyes-closed", label: "Ojos cerrados" },
];

const accessories: Array<{ value: PeepAccessory; label: string }> = [
  { value: "none", label: "Sin accesorio" },
  { value: "eyepatch", label: "Parche" },
  { value: "glasses", label: "Anteojos" },
  { value: "square-glasses", label: "Anteojos cuadrados" },
  { value: "half-rim-glasses", label: "Anteojos media montura" },
  { value: "round-glasses", label: "Anteojos redondos" },
  { value: "wide-glasses", label: "Anteojos anchos" },
  { value: "sunglasses", label: "Gafas de sol" },
  { value: "sport-sunglasses", label: "Gafas deportivas" },
];

type LabMotion = StoryMotionPreset;
type LabBehavior = "active" | "blink-off" | "paused";
type BustControlSection =
  | "variant"
  | "expression"
  | "accessory"
  | "behavior"
  | "motion";

const variants: Array<{ value: PeepBustVariant; label: string }> = [
  { value: "classic", label: "Clásico" },
  { value: "creative", label: "Creativo" },
  { value: "casual", label: "Casual" },
  { value: "mentor", label: "Mentor" },
  { value: "coffee", label: "Con café" },
];

const behaviors: Array<{ value: LabBehavior; label: string }> = [
  { value: "active", label: "Activo" },
  { value: "blink-off", label: "Sin parpadeo" },
  { value: "paused", label: "Pausado" },
];

const motions: Array<{ value: LabMotion; label: string }> = [
  { value: "enter", label: "Entrar" },
  { value: "float", label: "Flotar" },
  { value: "point", label: "Señalar" },
  { value: "celebrate", label: "Celebrar" },
  { value: "warn", label: "Advertir" },
  { value: "none", label: "Quieto" },
];

function InteractivePeepLab() {
  const [variant, setVariant] = useState<PeepBustVariant>("classic");
  const [expression, setExpression] = useState<PeepExpression>("smile");
  const [accessory, setAccessory] = useState<PeepAccessory>("glasses");
  const [behavior, setBehavior] = useState<LabBehavior>("active");
  const [motion, setMotion] = useState<LabMotion>("float");
  const [motionKey, setMotionKey] = useState(0);
  const [openSection, setOpenSection] = useState<BustControlSection | null>(
    "variant",
  );

  const paused = behavior === "paused";
  const blink = behavior !== "blink-off";

  const playMotion = (nextMotion: LabMotion) => {
    setMotion(nextMotion);
    setMotionKey((current) => current + 1);
  };

  const toggleSection = (section: BustControlSection) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  const selectedVariant =
    variants.find((item) => item.value === variant)?.label ?? variant;
  const selectedExpression =
    expressions.find((item) => item.value === expression)?.label ?? expression;
  const selectedAccessory =
    accessories.find((item) => item.value === accessory)?.label ?? accessory;
  const selectedBehavior =
    behaviors.find((item) => item.value === behavior)?.label ?? behavior;
  const selectedMotion =
    motions.find((item) => item.value === motion)?.label ?? motion;

  return (
    <main className="peep-lab peep-lab--interactive">
      <section className="peep-lab__stage" aria-label="Vista previa del personaje">
        <StoryMotion
          className="peep-lab__figure"
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
        </StoryMotion>
      </section>

      <section className="peep-lab__panel">
        <p className="peep-lab__eyebrow">Laboratorio · prototipo 01</p>
        <h1>Dale una reacción.</h1>
        <p className="peep-lab__description">
          Combina el rostro y los accesorios, observa el parpadeo automático y
          prueba movimientos ambientales. Las piezas siguen siendo SVG reales.
        </p>

        <div className="peep-lab__accordion">
          <StoryControlAccordion
            id="bust-variant"
            label="Personaje"
            selectedLabel={selectedVariant}
            expanded={openSection === "variant"}
            onToggle={() => toggleSection("variant")}
            onPrevious={() =>
              setVariant(adjacentStoryValue(variants, variant, -1))
            }
            onNext={() =>
              setVariant(adjacentStoryValue(variants, variant, 1))
            }
          >
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
          </StoryControlAccordion>

          <StoryControlAccordion
            id="bust-expression"
            label="Expresión"
            selectedLabel={selectedExpression}
            expanded={openSection === "expression"}
            onToggle={() => toggleSection("expression")}
            onPrevious={() =>
              setExpression(adjacentStoryValue(expressions, expression, -1))
            }
            onNext={() =>
              setExpression(adjacentStoryValue(expressions, expression, 1))
            }
          >
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
          </StoryControlAccordion>

          <StoryControlAccordion
            id="bust-accessory"
            label="Accesorio"
            selectedLabel={selectedAccessory}
            expanded={openSection === "accessory"}
            onToggle={() => toggleSection("accessory")}
            onPrevious={() =>
              setAccessory(adjacentStoryValue(accessories, accessory, -1))
            }
            onNext={() =>
              setAccessory(adjacentStoryValue(accessories, accessory, 1))
            }
          >
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
          </StoryControlAccordion>

          <StoryControlAccordion
            id="bust-behavior"
            label="Comportamiento"
            selectedLabel={selectedBehavior}
            expanded={openSection === "behavior"}
            onToggle={() => toggleSection("behavior")}
            onPrevious={() =>
              setBehavior(adjacentStoryValue(behaviors, behavior, -1))
            }
            onNext={() =>
              setBehavior(adjacentStoryValue(behaviors, behavior, 1))
            }
          >
            {behaviors.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={behavior === item.value}
                onClick={() => setBehavior(item.value)}
              >
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>

          <StoryControlAccordion
            id="bust-motion"
            label="Movimiento"
            selectedLabel={selectedMotion}
            expanded={openSection === "motion"}
            onToggle={() => toggleSection("motion")}
            onPrevious={() =>
              playMotion(adjacentStoryValue(motions, motion, -1))
            }
            onNext={() => playMotion(adjacentStoryValue(motions, motion, 1))}
          >
            {motions.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={motion === item.value}
                onClick={() => playMotion(item.value)}
              >
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>
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
