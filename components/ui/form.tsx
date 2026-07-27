import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "./utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("ui-input", className)} {...props} />; }
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={cn("ui-textarea", className)} {...props} />; }
export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) { return <select className={cn("ui-select", className)} {...props}>{children}</select>; }
export function Checkbox({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("ui-checkbox", className)} type="checkbox" {...props} />; }
