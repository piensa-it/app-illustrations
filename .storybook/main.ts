import type { StorybookConfig } from "@storybook/react-vite";

const seoHead = () => `
  <title>Piensa IT Illustrations | Personajes SVG para React</title>
  <meta name="description" content="Piensa IT Illustrations: personajes SVG accesibles y personalizables para React, onboarding, documentación y experiencias de producto." />
  <meta name="application-name" content="Piensa IT Illustrations" />
  <meta name="theme-color" content="#0f172a" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Piensa IT" />
  <meta property="og:title" content="Piensa IT Illustrations | Personajes SVG para React" />
  <meta property="og:description" content="Personajes SVG accesibles y personalizables para React, onboarding, documentación y experiencias de producto." />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Piensa IT Illustrations | Personajes SVG para React" />
  <meta name="twitter:description" content="Personajes SVG accesibles y personalizables para experiencias de producto." />
`;

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: [
    {
      from: "../assets/source/open-peeps",
      to: "/open-peeps",
    },
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  managerHead: (head) => `${head}${seoHead()}`,
  // Conserva los estilos base que Storybook inyecta en el iframe. Entre ellos
  // están los que ocultan los placeholders de carga y de "No Preview".
  previewHead: (head) => `${head}${seoHead()}`,
  viteFinal: async (viteConfig) => {
    // Storybook consumes source files directly and must not generate package
    // declarations. Keeping vite:dts here makes clean browser jobs depend on
    // dist/index.d.ts, which only exists after the library build.
    viteConfig.plugins = viteConfig.plugins?.filter(
      (plugin) =>
        (plugin as { name?: string } | null | undefined)?.name !== "vite:dts",
    );

    return viteConfig;
  },
};

export default config;
