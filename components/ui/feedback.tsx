import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";
import { cn } from "./utils";

type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export function Card({ children, className }: { children: ReactNode; className?: string }) { return <section className={cn("ui-card", className)}>{children}</section>; }
export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) { return <span className={cn("ui-badge", `ui-badge-${tone}`, className)}>{children}</span>; }
export function Alert({ children, tone = "info", className }: { children: ReactNode; tone?: Exclude<Tone, "neutral" | "primary">; className?: string }) { return <div className={cn("ui-alert", `ui-alert-${tone}`, className)} role="alert">{children}</div>; }
export function Toast({ children, tone = "success", className }: { children: ReactNode; tone?: Exclude<Tone, "neutral">; className?: string }) { const icon: Record<string, IconName> = { success: "check", danger: "close", warning: "message", info: "message", primary: "message" }; return <div className={cn("ui-toast", `ui-toast-${tone}`, className)} role="status"><Icon name={icon[tone]} size={16} />{children}</div>; }
export function Progress({ value, label }: { value: number; label?: string }) { const safeValue = Math.min(100, Math.max(0, value)); return <div className="ui-progress" aria-label={label ?? `Fortschritt ${safeValue}%`}><span style={{ width: `${safeValue}%` }} /></div>; }
export function Avatar({ name, src, size = "md" }: { name: string; src?: string | null; size?: "sm" | "md" | "lg" }) { return <span className={cn("ui-avatar", `ui-avatar-${size}`, src && "ui-avatar-image")} title={name} style={src ? { backgroundImage: `url("${src}")` } : undefined}>{src ? <span className="ui-sr-only">{name}</span> : name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>; }
export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) { return <div className="ui-empty-state"><Icon name="file" size={24} /><strong>{title}</strong>{description && <p>{description}</p>}{action}</div>; }
export function LoadingState({ label = "Wird geladen" }: { label?: string }) { return <div className="ui-loading" role="status"><Icon name="spinner" size={18} /><span>{label}</span></div>; }
export function ErrorState({ title = "Etwas ist schiefgelaufen", description }: { title?: string; description?: string }) { return <div className="ui-error-state"><Icon name="close" size={20} /><strong>{title}</strong>{description && <p>{description}</p>}</div>; }
export function Skeleton({ className }: { className?: string }) { return <span className={cn("ui-skeleton", className)} aria-hidden="true" />; }
