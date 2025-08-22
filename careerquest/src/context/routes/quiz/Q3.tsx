// src/context/routes/quiz/Q3.tsx
import React from "react";

type Props = {
  onSelect: (value: string) => void;
};

export default function Q3({ onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Q3: Pick your ultimate weapon!</h2>

      <div className="grid gap-3">
        <button className="btn" onClick={() => onSelect("hardware_hero")}>
          🔧 Titan Wrench — (Hardware Hero)
        </button>
        <button className="btn" onClick={() => onSelect("cluster_commander")}>
          🐧 Bash Blade — (Cluster Commander)
        </button>
        <button className="btn" onClick={() => onSelect("cloud_architect")}>
          ☁️ Terraform Codex — (Cloud Architect)
        </button>
        <button className="btn" onClick={() => onSelect("model_launcher")}>
          🚀 Deployment Launcher — (Model Launcher)
        </button>
        <button className="btn" onClick={() => onSelect("data_master")}>
          💾 Data Ladle — (Data Master)
        </button>
        <button className="btn" onClick={() => onSelect("network_weaver")}>
          🌐 InfiniBlade — (Network Weaver)
        </button>
        <button className="btn" onClick={() => onSelect("security_guardian")}>
          🛡️ Zero‑Trust Shield — (Security Guardian)
        </button>
      </div>
    </div>
  );
}
