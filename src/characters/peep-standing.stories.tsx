import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryControlAccordion } from "../docs/story-control-accordion";
import { adjacentStoryValue } from "../docs/story-control-utils";
import { StoryMotion } from "../docs/story-motion";

import {
  PeepStanding,
  type PeepStandingHead,
  type PeepStandingOutfit,
  type PeepStandingPose,
} from "./peep-standing";
import type { PeepAccessory, PeepExpression } from "./peep-bust";
import "./peep-bust.stories.css";

const poses: Array<{ value: PeepStandingPose; label: string }> = [
  { value: "resting", label: "En reposo" },
  { value: "crossed-arms", label: "Brazos cruzados" },
  { value: "pointing", label: "Señalando" },
  { value: "walking", label: "Caminando" },
  { value: "robot-dance", label: "Robot dance" },
  { value: "easing", label: "Casual" },
  { value: "blazer", label: "Con blazer" },
  { value: "shirt", label: "Con camisa" },
];

const heads: Array<{ value: PeepStandingHead; label: string }> = [
  { value: "bun", label: "Moño" },
  { value: "bantu-knots", label: "Nudos bantú" },
  { value: "beanie", label: "Gorro" },
  { value: "gray-medium", label: "Cabello canoso" },
  { value: "afro", label: "Afro" },
  { value: "cornrows", label: "Trenzas" },
  { value: "hijab", label: "Hiyab" },
  { value: "mohawk", label: "Rockero" },
  { value: "pomp", label: "Tupé" },
  { value: "twists", label: "Twists" },
  { value: "bangs", label: "Flequillo" },
  { value: "buns", label: "Dos moños" },
  { value: "long-afro", label: "Afro largo" },
  { value: "long-curly", label: "Rizos largos" },
  { value: "turban", label: "Turbante" },
  { value: "cap", label: "Gorra" },
];

const outfits: Array<{ value: PeepStandingOutfit; label: string }> = [
  { value: "dark-top", label: "Parte superior negra · pantalón claro" },
  { value: "light-top", label: "Parte superior clara · pantalón oscuro" },
];

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

type ControlSection = "head" | "expression" | "accessory" | "outfit" | "pose";

function StandingLab() {
  const [pose, setPose] = useState<PeepStandingPose>("walking");
  const [head, setHead] = useState<PeepStandingHead>("mohawk");
  const [outfit, setOutfit] = useState<PeepStandingOutfit>("dark-top");
  const [expression, setExpression] = useState<PeepExpression>("smile");
  const [accessory, setAccessory] = useState<PeepAccessory>("glasses");
  const [paused, setPaused] = useState(false);
  const [openSection, setOpenSection] = useState<ControlSection | null>(
    "pose",
  );

  const toggleSection = (section: ControlSection) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  const selectedHead = heads.find((item) => item.value === head)?.label ?? head;
  const selectedExpression =
    expressions.find((item) => item.value === expression)?.label ?? expression;
  const selectedAccessory =
    accessories.find((item) => item.value === accessory)?.label ?? accessory;
  const selectedOutfit =
    outfits.find((item) => item.value === outfit)?.label ?? outfit;
  const selectedPose = poses.find((item) => item.value === pose)?.label ?? pose;

  return (
    <main className="peep-lab peep-lab--standing">
      <section className="peep-lab__stage" aria-label="Vista previa de cuerpo completo">
        <StoryMotion className="peep-lab__figure" motion="enter" paused={paused}>
          <PeepStanding
            pose={pose}
            head={head}
            outfit={outfit}
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
          Elige pose, contraste de vestuario, rostro y accesorios. El calzado
          conserva por ahora la silueta original de cada pose.
        </p>

        <div className="peep-lab__accordion">
          <StoryControlAccordion
            id="head"
            label="Cabeza y cabello"
            icon="◉"
            selectedLabel={selectedHead}
            expanded={openSection === "head"}
            onToggle={() => toggleSection("head")}
            onPrevious={() => setHead(adjacentStoryValue(heads, head, -1))}
            onNext={() => setHead(adjacentStoryValue(heads, head, 1))}
          >
            {heads.map((item) => (
              <button key={item.value} type="button" aria-pressed={head === item.value} onClick={() => setHead(item.value)}>
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>

          <StoryControlAccordion
            id="expression"
            label="Expresión"
            icon="☺"
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
              <button key={item.value} type="button" aria-pressed={expression === item.value} onClick={() => setExpression(item.value)}>
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>

          <StoryControlAccordion
            id="accessory"
            label="Accesorio"
            icon="◌"
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
              <button key={item.value} type="button" aria-pressed={accessory === item.value} onClick={() => setAccessory(item.value)}>
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>

          <StoryControlAccordion
            id="outfit"
            label="Vestuario"
            icon="▣"
            selectedLabel={selectedOutfit}
            expanded={openSection === "outfit"}
            onToggle={() => toggleSection("outfit")}
            onPrevious={() =>
              setOutfit(adjacentStoryValue(outfits, outfit, -1))
            }
            onNext={() => setOutfit(adjacentStoryValue(outfits, outfit, 1))}
          >
            {outfits.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={outfit === item.value}
                onClick={() => setOutfit(item.value)}
              >
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>

          <StoryControlAccordion
            id="pose"
            label="Pose"
            icon="↗"
            selectedLabel={selectedPose}
            expanded={openSection === "pose"}
            onToggle={() => toggleSection("pose")}
            onPrevious={() => setPose(adjacentStoryValue(poses, pose, -1))}
            onNext={() => setPose(adjacentStoryValue(poses, pose, 1))}
          >
            {poses.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={pose === item.value}
                onClick={() => setPose(item.value)}
              >
                {item.label}
              </button>
            ))}
          </StoryControlAccordion>
        </div>

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
    pose: "walking",
    head: "mohawk",
    outfit: "dark-top",
    expression: "smile",
    accessory: "glasses",
    title: "Persona caminando",
    style: { width: 220 },
  },
};
