"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "./icon";

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const dialogRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!open) return; openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); if (event.key === "Tab" && dialogRef.current) { const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); const first = focusable[0]; const last = focusable[focusable.length - 1]; if (focusable.length && ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last))) { event.preventDefault(); (event.shiftKey ? last : first).focus(); } } }; window.addEventListener("keydown", handleKeyDown); dialogRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea')?.focus(); return () => { window.removeEventListener("keydown", handleKeyDown); openerRef.current?.focus(); }; }, [open, onClose]);
  if (!open) return null;
  return <div className="ui-modal-backdrop" role="presentation" onMouseDown={onClose}><section ref={dialogRef} className="ui-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}><header><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Dialog schließen"><Icon name="close" /></button></header><div>{children}</div></section></div>;
}
