import type { StorybookConfig } from "@storybook/react-vite";

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
