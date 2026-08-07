import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    options: {
      storySort: {
        order: [
          "Catálogo",
          ["Figuras fuente"],
          "Laboratorio",
          ["Personaje de cuerpo completo", "Personaje interactivo"],
        ],
      },
    },
  },
};

export default preview;
