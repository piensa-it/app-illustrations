import type { ReactNode } from "react";

interface StoryControlAccordionProps {
  id: string;
  label: string;
  icon: string;
  selectedLabel: string;
  expanded: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
}

/** Control compartido exclusivamente por los laboratorios de Storybook. */
export function StoryControlAccordion({
  id,
  label,
  icon,
  selectedLabel,
  expanded,
  onToggle,
  onPrevious,
  onNext,
  children,
}: StoryControlAccordionProps) {
  const panelId = `${id}-controls-panel`;

  return (
    <section className="peep-lab__accordion-section">
      <div className="peep-lab__accordion-header">
        <button
          className="peep-lab__carousel-arrow"
          type="button"
          aria-label={`${label} anterior`}
          title={`${label} anterior`}
          onClick={onPrevious}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="peep-lab__accordion-trigger"
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="peep-lab__accordion-label">{label}</span>
          <span className="peep-lab__accordion-control-icon" aria-hidden="true">
            {icon}
          </span>
          <span className="peep-lab__accordion-selection" aria-live="polite">
            {selectedLabel}
          </span>
          <span className="peep-lab__accordion-icon" aria-hidden="true">
            {expanded ? "−" : "+"}
          </span>
        </button>
        <button
          className="peep-lab__carousel-arrow"
          type="button"
          aria-label={`Siguiente ${label.toLowerCase()}`}
          title={`Siguiente ${label.toLowerCase()}`}
          onClick={onNext}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div
        className="peep-lab__accordion-panel"
        id={panelId}
        hidden={!expanded}
      >
        <fieldset>
          <legend className="peep-lab__sr-only">{label}</legend>
          <div className="peep-lab__choices">{children}</div>
        </fieldset>
      </div>
    </section>
  );
}
