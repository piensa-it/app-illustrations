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
    await expect(
      page.getByRole("button", { name: /Personaje Clásico/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("button", { name: "Con café" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Accesorio Anteojos/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Comportamiento Activo/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Movimiento Flotar/ }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Siguiente personaje" }).click();
    await expect(
      page.getByRole("button", { name: /Personaje Creativo/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Personaje anterior" }).click();
    await expect(
      page.getByRole("button", { name: /Personaje Clásico/ }),
    ).toBeVisible();

    const hasPageOverflow = await page.evaluate(
      () => document.body.scrollHeight > document.body.clientHeight,
    );
    expect(hasPageOverflow).toBe(false);
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

  test("keeps the pointing pose visually stable", async ({ page }) => {
    await page.goto(
      storyUrl(
        "laboratorio-personaje-de-cuerpo-completo--componente-base",
        "pose:pointing;outfit:dark-top;head:mohawk;expression:smile;accessory:none;blink:off",
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

  test("keeps the standing laboratory compact and exposes its controls", async ({ page }) => {
    await page.goto(
      storyUrl(
        "laboratorio-personaje-de-cuerpo-completo--poses-interactivas",
      ),
    );
    await stabilize(page);

    await expect(
      page.getByRole("button", { name: /Pose Caminando/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("button", { name: "Con blazer", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Accesorio Anteojos/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: /Vestuario Parte superior negra · pantalón claro/,
      }),
    ).toBeVisible();

    const previewBounds = await page.locator(".peep-lab__figure").boundingBox();
    const labBounds = await page.locator(".peep-lab").boundingBox();
    expect(previewBounds).not.toBeNull();
    expect(labBounds).not.toBeNull();
    expect(previewBounds!.y).toBeGreaterThanOrEqual(0);
    expect(previewBounds!.y + previewBounds!.height).toBeLessThanOrEqual(
      labBounds!.y + labBounds!.height,
    );

    const hasPageOverflow = await page.evaluate(
      () => document.body.scrollHeight > document.body.clientHeight,
    );
    expect(hasPageOverflow).toBe(false);

    await page.getByRole("button", { name: "Siguiente pose" }).click();
    await expect(
      page.getByRole("button", { name: /Pose Robot dance/ }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Pose anterior" }).click();
    await expect(
      page.getByRole("button", { name: /Pose Caminando/ }),
    ).toBeVisible();
  });

  test("keeps the character prominent with a compact mobile control rail", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(
      storyUrl("laboratorio-personaje-interactivo--prototipo-de-busto"),
    );
    await stabilize(page);

    await expect(page.locator(".peep-bust")).toBeVisible();
    await expect(page.getByRole("button", { name: "Personaje" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Accesorio" })).toBeVisible();

    await page.getByRole("button", { name: "Accesorio" }).click();
    const choices = page.locator(".peep-lab__accordion-panel .peep-lab__choices");
    await expect(page.getByRole("button", { name: "Gafas deportivas" })).toBeVisible();
    expect(await choices.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);

    const hasPageOverflow = await page.evaluate(
      () => document.body.scrollHeight > document.body.clientHeight,
    );
    expect(hasPageOverflow).toBe(false);
  });
});
