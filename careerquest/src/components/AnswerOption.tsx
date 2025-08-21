import React from "react";
import { Check } from "lucide-react";

type Props = {
  label: string;
  hint?: string;
  icon: React.ReactNode;       // pass a lucide icon here
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  hotkey?: string;             // e.g. "1","2","A"
};

export default function AnswerOption({
  label,
  hint,
  icon,
  selected,
  disabled,
  onClick,
  hotkey,
}: Props) {
  return (
    <button
      className={`answer-option ${selected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={!!selected}
    >
      {hotkey && <span className="answer-hotkey">{hotkey}</span>}

      <div className="answer-icon">{icon}</div>

      <div className="answer-copy">
        <div className="answer-option-label">{label}</div>
        {hint && <div className="answer-option-hint">{hint}</div>}
      </div>

      {selected && (
        <div className="answer-check">
          <Check size={18} aria-hidden="true" />
        </div>
      )}

      <span className="answer-ripple" aria-hidden="true" />
    </button>
  );
}

