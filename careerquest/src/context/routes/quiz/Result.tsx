// src/context/routes/quiz/Result.tsx
import React from "react";

type Props = {
  heroKey: string;
  onRestart: () => void;
};

const TITLES: Record<string, string> = {
  hardware_hero: "Hardware Hero",
  cluster_commander: "Cluster Commander",
  cloud_architect: "Cloud Architect",
  model_launcher: "Model Launcher",
  data_master: "Data Master",
  network_weaver: "Network Weaver",
  security_guardian: "Security Guardian",
};

export default function Result({ heroKey, onRestart }: Props) {
  const title = TITLES[heroKey] ?? "Adventurer";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Hero Class: {title}</h2>
      <p className="text-sm opacity-80">
        Nice! You’ve unlocked a starter path. Continue to see your learning plan.
      </p>
      <div>
        <button className="btn" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
