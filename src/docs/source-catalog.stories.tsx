import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "./source-catalog.css";

type Category = "Standing" | "Sitting" | "Bust";
type Filter = "Todos" | Category;

interface SourceFigure {
  category: Category;
  file: string;
}

const figures: SourceFigure[] = [
  { category: "Standing", file: "peep-standing-1" },
  { category: "Standing", file: "peep-standing-4" },
  { category: "Standing", file: "peep-standing-7" },
  { category: "Standing", file: "peep-standing-10" },
  { category: "Standing", file: "peep-standing-16" },
  { category: "Standing", file: "peep-standing-21" },
  { category: "Sitting", file: "peep-sitting-1" },
  { category: "Sitting", file: "peep-sitting-4" },
  { category: "Sitting", file: "peep-sitting-7" },
  { category: "Sitting", file: "peep-sitting-10" },
  { category: "Sitting", file: "peep-sitting-14" },
  { category: "Sitting", file: "peep-sitting-18" },
  { category: "Bust", file: "peep-1" },
  { category: "Bust", file: "peep-12" },
  { category: "Bust", file: "peep-28" },
  { category: "Bust", file: "peep-44" },
  { category: "Bust", file: "peep-73" },
  { category: "Bust", file: "peep-101" },
];

const filters: Filter[] = ["Todos", "Standing", "Sitting", "Bust"];

const imageUrl = ({ category, file }: SourceFigure) =>
  `/open-peeps/Templates/${category}/${file}.png`;

function SourceCatalog() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [selected, setSelected] = useState<string[]>([]);

  const visibleFigures = useMemo(
    () =>
      filter === "Todos"
        ? figures
        : figures.filter((figure) => figure.category === filter),
    [filter],
  );

  const toggleSelection = (file: string) => {
    setSelected((current) =>
      current.includes(file)
        ? current.filter((item) => item !== file)
        : [...current, file],
    );
  };

  return (
    <main className="source-catalog">
      <header className="source-catalog__header">
        <div>
          <p className="source-catalog__eyebrow">Open Peeps · mesa de selección</p>
          <h1>Elige quién cuenta la historia.</h1>
          <p className="source-catalog__intro">
            Una primera muestra para descubrir personajes de onboarding,
            estados vacíos, guías y banners. Selecciona tus favoritos para
            convertirlos después en ilustraciones oficiales.
          </p>
        </div>
        <div className="source-catalog__count" aria-label={`${visibleFigures.length} figuras visibles`}>
          <strong>{String(visibleFigures.length).padStart(2, "0")}</strong>
          <span>figuras visibles</span>
        </div>
      </header>

      <nav className="source-catalog__toolbar" aria-label="Filtrar figuras">
        {filters.map((item) => (
          <button
            className="source-catalog__filter"
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="source-catalog__grid" aria-label="Figuras disponibles">
        {visibleFigures.map((figure, index) => {
          const isSelected = selected.includes(figure.file);

          return (
            <button
              className="source-card"
              data-index={String(index + 1).padStart(2, "0")}
              key={`${figure.category}-${figure.file}`}
              type="button"
              aria-label={`${isSelected ? "Quitar" : "Seleccionar"} ${figure.file}`}
              aria-pressed={isSelected}
              onClick={() => toggleSelection(figure.file)}
            >
              <span className="source-card__image">
                <img src={imageUrl(figure)} alt="" loading="lazy" />
              </span>
              <span className="source-card__meta">
                <strong>{figure.file}</strong>
                <span>{figure.category}</span>
              </span>
            </button>
          );
        })}
      </section>

      {selected.length > 0 && (
        <aside className="source-catalog__selection" aria-live="polite">
          <p>
            <strong>{selected.length} seleccionadas</strong>
            <br />
            {selected.join(", ")}
          </p>
          <button type="button" onClick={() => setSelected([])}>
            Limpiar
          </button>
        </aside>
      )}
    </main>
  );
}

const meta = {
  title: "Catálogo/Figuras fuente",
  component: SourceCatalog,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SourceCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MuestraInicial: Story = {};
