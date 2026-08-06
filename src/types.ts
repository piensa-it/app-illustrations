import type { SVGProps } from "react";

export interface IllustrationProps extends SVGProps<SVGSVGElement> {
  /** Texto accesible. Si se omite, la ilustración se considera decorativa. */
  title?: string;
}
