import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, useEffect, useState } from "react";

import { PeepBust, type PeepAnimation } from "./peep-bust";
import { PeepStanding } from "./peep-standing";

const meta = {
  title: "Characters/PeepBust/Animation",
  component: PeepBust,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PeepBust>;

export default meta;

type Story = StoryObj<typeof meta>;

const frame: CSSProperties = { width: 220 };

export const Float: Story = {
  args: { animation: "float", variant: "classic", style: frame },
};

export const Loading: Story = {
  args: { animation: "loading", variant: "coffee", expression: "calm", style: frame },
};

export const Thinking: Story = {
  args: { animation: "thinking", variant: "mentor", expression: "explaining", style: frame },
};

export const Wave: Story = {
  args: { animation: "wave", variant: "creative", expression: "smile", style: frame },
};

export const Success: Story = {
  args: { animation: "success", variant: "classic", expression: "smile-big", style: frame },
};

const ProcessDemo = () => {
  const [state, setState] = useState<PeepAnimation>("loading");

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => (prev === "loading" ? "success" : "loading"));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <PeepBust
      style={frame}
      animation={state}
      variant="coffee"
      expression={state === "loading" ? "calm" : "smile-big"}
      title={state === "loading" ? "Procesando" : "Listo"}
    />
  );
};

export const Process: Story = {
  render: () => <ProcessDemo />,
};

export const StandingWave: Story = {
  render: () => (
    <PeepStanding
      style={frame}
      animation="wave"
      pose="resting"
      head="mohawk"
      expression="smile"
      title="Saludo de bienvenida"
    />
  ),
};

export const StandingLoading: Story = {
  render: () => (
    <PeepStanding
      style={frame}
      animation="loading"
      pose="resting"
      expression="calm"
      title="Procesando"
    />
  ),
};
