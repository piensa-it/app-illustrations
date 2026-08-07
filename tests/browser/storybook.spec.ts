import { expect, test, type Page } from "@playwright/test";

const storyUrl = (id: string, args?: string) => {
  const query = new URLSearchParams({ id, viewMode: "story" });
  if (args) query.set("args", args);
  return `/iframe.html?${query.toString()}`;
};

const stabilize = async (page: Page) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        caret-color: transparent !important;
        transition: none !important;
      }
    `,
  });
  await page.evaluate(() => document.fonts.ready);
};

test.describe("Storybook browser gate", () => {
  test("renders the interactive bust without browser errors", async ({ page }) => {
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));

    await page.goto(
      storyUrl("laboratorio-personaje-interactivo--prototipo-de-busto"),
    );

    await expect(page.locator(".peep-bust")).toBeVisible();
    await expect(page.getByRole("button", { name: "Con café" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("keeps the coffee bust visually stable", async ({ page }) => {
    await page.goto(
      storyUrl(
        "laboratorio-personaje-interactivo--componente-base",
        "variant:coffee;expression:smile;accessory:glasses;blink:off",
      ),
    );
    await stabilize(page);

    const character = page.locator(".peep-bust");
    await expect(character).toBeVisible();
    await expect(character).toHaveScreenshot("bust-coffee.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });

  test("keeps hands, head and round glasses inside the mentor bust", async ({ page }) => {
    await page.goto(
      storyUrl(
        "laboratorio-personaje-interactivo--componente-base",
        "variant:mentor;expression:serious;accessory:round-glasses;blink:off",
      ),
    );
    await stabilize(page);

    const character = page.locator(".peep-bust");
    await expect(character).toBeVisible();
    await expect(character.locator('[data-peep-layer="body"]')).toBeVisible();
    await expect(character.locator('[data-peep-layer="head"]')).toBeVisible();
    await expect(character.locator('[data-peep-layer="accessory"]')).toBeVisible();
    await expect(character).toHaveScreenshot("bust-mentor-round-glasses.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });

  test("renders a complete standing character", async ({ page }) => {
    await page.goto(
      storyUrl(
        "laboratorio-personaje-de-cuerpo-completo--componente-base",
        "pose:pointing;variant:creative;expression:smile;accessory:none;blink:off",
      ),
    );
    await stabilize(page);

    const character = page.locator(".peep-standing");
    await expect(character).toBeVisible();
    await expect(character).toHaveScreenshot("standing-pointing.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });
});

