import type { ReactNode, SVGProps } from "react";

export type IconName = "arrow-up-right" | "arrow-right" | "check" | "close" | "file" | "message" | "plus" | "sun" | "moon" | "spinner";

export function Icon({ name, size = 18, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...props };
  const paths: Record<IconName, ReactNode> = {
    "arrow-up-right": <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    "arrow-right": <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>,
    message: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 8.4 8.4 0 0 1-4-.9L3 21l1.7-4.4A8.4 8.4 0 1 1 21 11.5Z" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.7 15.1A8.5 8.5 0 0 1 8.9 3.3 8.5 8.5 0 1 0 20.7 15.1Z" />,
    spinner: <path d="M20 12a8 8 0 1 1-2.34-5.66" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
