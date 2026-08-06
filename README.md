# @piensa-it/illustrations

Catálogo compartido de ilustraciones de Piensa IT para aplicaciones,
onboarding, guías, manuales y banners.

## Frontera del paquete

Este repositorio contiene recursos visuales y componentes SVG estáticos. Las
animaciones, contenedores y políticas de movimiento pertenecen a
`@piensa-it/ui-library`.

## Dónde colocar los assets originales

Copia sin modificar los archivos descargados de Open Peeps en:

```text
assets/source/open-peeps/
```

Esta carpeta conserva la procedencia y no se publica en npm. Los SVG listos
para consumo se convierten en componentes React dentro de `src/`; las
exportaciones para manuales se guardan en `assets/exports/`.

## Estructura

```text
src/
├── characters/  # personajes reutilizables
├── elements/    # objetos y piezas reutilizables
└── scenes/      # composiciones semánticas listas para consumir

assets/
├── source/      # originales sin modificar
└── exports/     # SVG y raster para usos fuera de React
```

## Comandos

```bash
npm install
npm run storybook
npm run build
npm run test:run
npm run lint
```
