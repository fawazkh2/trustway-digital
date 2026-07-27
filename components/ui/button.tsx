import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg"; children: ReactNode };

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return <button className={cn("ui-button", `ui-button-${variant}`, `ui-button-${size}`, className)} {...props} />;
}
