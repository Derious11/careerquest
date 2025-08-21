import { type ReactNode } from 'react'


export function Card({ children }: { children: ReactNode }) {
return <div className="card">{children}</div>
}


export function Button({ children, onClick, variant = 'primary', disabled, title }: { children: ReactNode; onClick?: () => void; variant?: 'primary'|'ghost'|'outline'; disabled?: boolean; title?: string }) {
return <button className={`btn ${variant}`} onClick={onClick} disabled={disabled} title={title}>{children}</button>
}


export function Field({ label, children }: { label: string; children: ReactNode }) {
return (
<label className="field">
<span>{label}</span>
{children}
</label>
)
}