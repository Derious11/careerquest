import React from "react";

export type TechCardData = {
  id: number;
  title: string;        // e.g., "Hardware Hero"
  clazz: string;        // e.g., "Data Center • Tier I"
  rarity: "common" | "rare" | "legendary";
  img: string;          // import path
  accent: string;       // hex for frame accent
  text: string;         // short blurb
};

export default function TechCard({
  data,
  selected = false,
  onClick,
}: {
  data: TechCardData;
  selected?: boolean;
  onClick?: () => void;
}) {
  const style: React.CSSProperties = { ["--accent" as any]: data.accent };
  return (
    <button
      className={`mtg-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
      title={data.title}
      style={style}
    >
      <div className="mtg-inner">
        <div className="mtg-titlebar">
          <span className="mtg-title">{data.title}</span>
          <span className={`rarity ${data.rarity}`} />
        </div>

        <div className="mtg-art">
          <img src={data.img} alt={`${data.title} artwork`} loading="lazy" />
          <div className="foil" />
        </div>

        <div className="mtg-type">{data.clazz}</div>

        <div className="mtg-text">{data.text}</div>

        <div className="mtg-footer">
          <span className="set">CQ • Alpha</span>
          <span className="sig">⚙︎</span>
        </div>
      </div>
    </button>
  );
}
