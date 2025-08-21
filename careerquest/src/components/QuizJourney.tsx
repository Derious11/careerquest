// src/components/QuizJourney.tsx
import React, { useEffect, useMemo, useState } from "react";
import AnswerOption from "./AnswerOption";
import {
  Wrench, Server, Rocket, Shield,        // Q1
  Cpu, Cloud, Database, Network,          // Q2
  Puzzle, Layers, Cable, Hammer,          // Q3
  BarChart3, Cog, Lock, Antenna,          // Q4
  BookOpen, Compass, Heart, Scale         // Q5
} from "lucide-react";

const QUIZ_STORAGE = "careerquest.quiz.v1";

type Props = {
  onBack: () => void;
  onComplete: (heroKey: HeroKey) => void;
};

type Choice = { label: string; hint: string; icon: JSX.Element; key: string };

/** Canonical hero keys used across the app */
export type HeroKey =
  | "hardware_hero"
  | "cluster_commander"
  | "cloud_architect"
  | "model_launcher"
  | "data_master"
  | "network_weaver"
  | "security_guardian";

/* -------------------- Questions -------------------- */
const Q1: Choice[] = [
  { label: "Builder",    hint: "Hardware Hero, Data Master",          icon: <Wrench/>,   key: "builder" },
  { label: "Strategist", hint: "Cluster Commander, Cloud Architect",  icon: <Server/>,   key: "strategist" },
  { label: "Innovator",  hint: "Model Launcher",                      icon: <Rocket/>,   key: "innovator" },
  { label: "Protector",  hint: "Security Guardian, Network Weaver",   icon: <Shield/>,   key: "protector" },
];

const Q2: Choice[] = [
  { label: "Tinker & build PCs",       hint: "Hands-on hardware",     icon: <Cpu/>,      key: "pcbuild" },
  { label: "Spin up homelab services", hint: "Self-host & automate",  icon: <Cloud/>,    key: "homelab" },
  { label: "Collect & analyze data",   hint: "SQL • dashboards",      icon: <Database/>, key: "data" },
  { label: "Design fast networks",     hint: "Switching • routing",   icon: <Network/>,  key: "net" },
];

const Q3: Choice[] = [
  { label: "Solve tricky problems",  hint: "Debug & diagnose",       icon: <Puzzle/>,   key: "debug" },
  { label: "Architect systems",      hint: "Diagrams & modules",     icon: <Layers/>,   key: "arch" },
  { label: "Wire things together",   hint: "Integration focus",      icon: <Cable/>,    key: "integrate" },
  { label: "Build sturdy stuff",     hint: "Reliable delivery",      icon: <Hammer/>,   key: "ship" },
];

const Q4: Choice[] = [
  { label: "Make metrics sing",      hint: "KPIs • dashboards",      icon: <BarChart3/>, key: "metrics" },
  { label: "Automate the boring",    hint: "Scripting • CI/CD",      icon: <Cog/>,       key: "auto" },
  { label: "Harden security",        hint: "Threats • controls",     icon: <Lock/>,      key: "sec" },
  { label: "Master wireless/RF",     hint: "Coverage • tuning",      icon: <Antenna/>,   key: "rf" },
];

const Q5: Choice[] = [
  { label: "Knowledge Seeker",       hint: "Always learning",        icon: <BookOpen/>,  key: "learn" },
  { label: "Explorer",               hint: "Try new paths",          icon: <Compass/>,   key: "explore" },
  { label: "Heart-driven",           hint: "Help & mentor others",   icon: <Heart/>,     key: "mentor" },
  { label: "Moral Compass",          hint: "Fairness & ethics",      icon: <Scale/>,     key: "ethics" },
];

const QUESTIONS = [
  { title: "When you’re in a team, what role do you usually take?", opts: Q1 },
  { title: "Which activity sounds most fun to you?",                opts: Q2 },
  { title: "Pick your superpower at work.",                         opts: Q3 },
  { title: "What do you want to get GREAT at?",                     opts: Q4 },
  { title: "What guides your choices the most?",                    opts: Q5 },
];

/* --------------- Scoring → Hero mapping ---------------
   Each answer contributes to one or more hero buckets. */
const SCORE_WEIGHTS: Record<string, Partial<Record<HeroKey, number>>> = {
  // Q1
  builder:    { hardware_hero: 1, data_master: 0.5 },
  strategist: { cluster_commander: 1, cloud_architect: 1 },
  innovator:  { model_launcher: 1 },
  protector:  { security_guardian: 1, network_weaver: 0.75 },

  // Q2
  pcbuild: { hardware_hero: 1 },
  homelab: { cloud_architect: 1, cluster_commander: 0.5 },
  data:    { data_master: 1 },
  net:     { network_weaver: 1 },

  // Q3
  debug:      { hardware_hero: 0.5, data_master: 0.5, security_guardian: 0.5 },
  arch:       { cloud_architect: 1, cluster_commander: 0.5 },
  integrate:  { cluster_commander: 1, model_launcher: 0.5, network_weaver: 0.5 },
  ship:       { model_launcher: 1, hardware_hero: 0.5 },

  // Q4
  metrics: { data_master: 1 },
  auto:    { cluster_commander: 0.5, cloud_architect: 0.75, model_launcher: 0.5 },
  sec:     { security_guardian: 1 },
  rf:      { network_weaver: 1 },

  // Q5
  learn:   { data_master: 0.5, cloud_architect: 0.5 },
  explore: { model_launcher: 0.5, cluster_commander: 0.5 },
  mentor:  { hardware_hero: 0.5, network_weaver: 0.5 },
  ethics:  { security_guardian: 0.5 },
};

function pickHero(answers: string[]): HeroKey {
  const totals: Record<HeroKey, number> = {
    hardware_hero: 0,
    cluster_commander: 0,
    cloud_architect: 0,
    model_launcher: 0,
    data_master: 0,
    network_weaver: 0,
    security_guardian: 0,
  };

  for (const a of answers) {
    const weights = SCORE_WEIGHTS[a];
    if (!weights) continue;
    for (const key in weights) {
      totals[key as HeroKey] += (weights as any)[key] || 0;
    }
  }

  // pick the highest; stable fallback to hardware_hero
  let best: HeroKey = "hardware_hero";
  let bestScore = -Infinity;
  (Object.keys(totals) as HeroKey[]).forEach((k) => {
    if (totals[k] > bestScore) {
      best = k;
      bestScore = totals[k];
    }
  });
  return best;
}

/* -------------------- Component -------------------- */
export default function QuizJourney({ onBack, onComplete }: Props) {
  const [i, setI] = useState(0); // question index
  const [answers, setAnswers] = useState<string[]>(
    () => {
      try {
        const raw = localStorage.getItem(QUIZ_STORAGE);
        return raw ? JSON.parse(raw) : Array(QUESTIONS.length).fill("");
      } catch {
        return Array(QUESTIONS.length).fill("");
      }
    }
  );

  const progress = useMemo(
    () => Math.round(((i + 1) / QUESTIONS.length) * 100),
    [i]
  );

  // persist answers on change
  useEffect(() => {
    localStorage.setItem(QUIZ_STORAGE, JSON.stringify(answers));
  }, [answers]);

  // hotkeys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 4) {
        const choice = QUESTIONS[i].opts[n - 1];
        if (choice) onSelect(choice.key);
      }
      if (e.key === "Enter" && answers[i]) onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight" && answers[i]) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [i, answers]);

  const onSelect = (key: string) => {
    const copy = [...answers];
    copy[i] = key;
    setAnswers(copy);
  };

  const onNext = () => {
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
    } else {
      // finished → compute hero, clear quiz state, result page
      const hero = pickHero(answers);
      onComplete(hero);
    }
  };

  const onPrev = () => setI((x) => Math.max(x - 1, 0));

  const q = QUESTIONS[i];

  return (
    <div>
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="quiz-progress">Question {i + 1} of {QUESTIONS.length}</p>
      </div>

      <h2 className="quiz-question">{q.title}</h2>

      <div className="quiz-options">
        {q.opts.map((o, idx) => (
          <AnswerOption
            key={o.key}
            label={o.label}
            hint={o.hint}
            icon={o.icon}
            selected={answers[i] === o.key}
            onClick={() => onSelect(o.key)}
            hotkey={String(idx + 1)}
          />
        ))}
      </div>

      <div className="row between">
        <button className="btn ghost" onClick={onPrev} disabled={i === 0}>Back</button>
        <button className="btn primary" onClick={onNext} disabled={!answers[i]}>
          {i === QUESTIONS.length - 1 ? "See My Hero Class" : "Next"}
        </button>
      </div>
    </div>
  );
}
