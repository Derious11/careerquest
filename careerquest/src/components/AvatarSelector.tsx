import React from "react";
import { Button, Card } from "./UI";
import type { Gender } from "../types";
import TechCard, { type TechCardData } from "./TechCard";

// --- image imports (drop files into src/assets/cards first) ---
import hardware from "../assets/cards/apprentice.png";
import cluster from "../assets/cards/squire.png";
import cloud from "../assets/cards/dreamer.png";
import mlops from "../assets/cards/scrapper.png";
import data from "../assets/cards/forager.png";
import network from "../assets/cards/wire-runner.png";
import security from "../assets/cards/shield.png";

const CARDS: TechCardData[] = [
  {
       id: 0,
    title: "Apprentice Tinkerer",
    clazz: "Data Center • Tier 0",
    rarity: "common",
    img: hardware,
    accent: "#7aa2ff",
    text: "Haul old servers, patch cables, and pray the fans keep spinning."
  },
  {
    id: 1,
    title: "Terminal Squire",
    clazz: "Linux • Bash • Bare Metal",
    rarity: "common",
    img: cluster,
    accent: "#7aa2ff",
    text: "Wrangle broken laptops, copy-paste commands, fix endless errors."
  },
  {
    id: 2,
    title: "Cloud Dreamer",
    clazz: "DIY Clouds • Scripts",
    rarity: "rare",
    img: cloud,
    accent: "#b892ff",
    text: "Sketch castles in the sky with paper blueprints and duct-taped scripts."
  },
  {
    id: 3,
    title: "Prototype Scrapper",
    clazz: "Jupyter • Bash • Duct Tape",
    rarity: "rare",
    img: mlops,
    accent: "#b892ff",
    text: "Hack models together with broken laptops, hope they don’t crash."
  },
  {
    id: 4,
    title: "Data Forager",
    clazz: "CSV • Scrolls • Floppies",
    rarity: "rare",
    img: data,
    accent: "#9bffd1",
    text: "Scavenge data from dusty disks and scattered notes in the wild."
  },
  {
    id: 5,
    title: "Wire-Runner",
    clazz: "Cables • Radios • Static",
    rarity: "rare",
    img: network,
    accent: "#66a3ff",
    text: "Tangled in cords, shouting into busted walkie-talkies for signal."
  },
  {
    id: 6,
    title: "Shield Novice",
    clazz: "Cardboard Shield • Padlock",
    rarity: "legendary",
    img: security,
    accent: "#ff8aa8",
    text: "Hold the line with duct-taped armor and a wary eye for threats."
  },
];

export default function AvatarSelector({
  gender,
  selectedId,
  onSelect,
  onContinue,
  onBack,
}: {
  gender: Gender;
  selectedId: number | null;
  onSelect: (id: number) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <Card>
      <h2>Choose Your Class Card</h2>
      <p className="muted">
        Choose your starting path!
      </p>

      <div className="card-grid">
        {CARDS.map((c) => (
          <TechCard
            key={c.id}
            data={c}
            selected={selectedId === c.id}
            onClick={() => onSelect(c.id)}
          />
        ))}
      </div>

      <div className="row between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue} disabled={selectedId === null}>
          Continue
        </Button>
      </div>
    </Card>
  );
}
