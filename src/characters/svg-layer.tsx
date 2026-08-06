interface SvgLayerProps {
  source: string;
  viewBox: string;
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
  layer: string;
}

const innerSvg = (source: string) => {
  const svgStart = source.indexOf("<svg");
  const start = source.indexOf(">", svgStart);
  const end = source.lastIndexOf("</svg>");
  return start >= 0 && end > start ? source.slice(start + 1, end) : source;
};

/** Renderiza una fuente SVG confiable como capa vectorial sin recortar su contenido. */
export function SvgLayer({ source, viewBox, x, y, width, height, className, layer }: SvgLayerProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-peep-layer={layer}
      focusable="false"
      height={height}
      overflow="visible"
      viewBox={viewBox}
      width={width}
      x={x}
      y={y}
      dangerouslySetInnerHTML={{ __html: innerSvg(source) }}
    />
  );
}
