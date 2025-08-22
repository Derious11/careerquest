// src/context/routes/quiz/Q5.tsx
import React from "react";

type Props = {
  onConfirm: (agree: boolean) => void;
};

export default function Q5({ onConfirm }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Q5: How do you like to learn?</h2>

      <div className="grid gap-3">
        <button className="btn" onClick={() => onConfirm(true)}>
          Hands‑on labs + build projects
        </button>
        <button className="btn" onClick={() => onConfirm(true)}>
          Read docs then implement
        </button>
        <button className="btn" onClick={() => onConfirm(true)}>
          Watch videos then practice
        </button>
        <button className="btn" onClick={() => onConfirm(false)}>
          Not sure yet
        </button>
      </div>
    </div> // <-- both divs properly closed
  );
}
