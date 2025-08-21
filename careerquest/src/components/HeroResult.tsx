// src/components/HeroResult.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card } from "./UI";

export type HeroKey =
  | "hardware_hero"
  | "cluster_commander"
  | "cloud_architect"
  | "model_launcher"
  | "data_master"
  | "network_weaver"
  | "security_guardian";

// ---- Import hero images (first word of the key) ----
import hardwareImg from "../assets/cards/heros/hardware.png";
import clusterImg from "../assets/cards/heros/cluster.png";
import cloudImg from "../assets/cards/heros/cloud.png";
import modelImg from "../assets/cards/heros/model.png";
import dataImg from "../assets/cards/heros/data.png";
import networkImg from "../assets/cards/heros/network.png";
import securityImg from "../assets/cards/heros/security.png";

const HERO_IMAGES: Record<HeroKey, string> = {
  hardware_hero: hardwareImg,
  cluster_commander: clusterImg,
  cloud_architect: cloudImg,
  model_launcher: modelImg,
  data_master: dataImg,
  network_weaver: networkImg,
  security_guardian: securityImg,
};

const HERO_META: Record<
  HeroKey,
  { name: string; subtitle: string; blurb: string; accent: string }
> = {
  hardware_hero: {
    name: "Hardware Hero",
    subtitle: "Data Center • Tier I",
    blurb: "Hands-on builder who makes real things work.",
    accent: "#7aa2ff",
  },
  cluster_commander: {
    name: "Cluster Commander",
    subtitle: "Linux • Orchestration",
    blurb: "Systems strategist who keeps services humming.",
    accent: "#9bffd1",
  },
  cloud_architect: {
    name: "Cloud Architect",
    subtitle: "Design • Automation",
    blurb: "Blueprints, automation, and scalable design are your toolkit.",
    accent: "#b892ff",
  },
  model_launcher: {
    name: "Model Launcher",
    subtitle: "MLOps • Delivery",
    blurb: "You ship ideas to production and improve them.",
    accent: "#ffd36b",
  },
  data_master: {
    name: "Data Master",
    subtitle: "Pipelines • Analytics",
    blurb: "You turn raw data into useful signals.",
    accent: "#60d6b8",
  },
  network_weaver: {
    name: "Network Weaver",
    subtitle: "Switching • RF",
    blurb: "You stitch systems together and make them fast.",
    accent: "#66a3ff",
  },
  security_guardian: {
    name: "Security Guardian",
    subtitle: "Defense • Detection",
    blurb: "You harden, monitor, and protect the realm.",
    accent: "#ff8aa8",
  },
};

/**
 * Placeholder text summaries for each hero.
 * Replace each string with your final copy.
 */
const HERO_SUMMARY: Record<HeroKey, string> = {
  hardware_hero: `
Congratulations! Your responses chosen mean you most align with the Hardware Hero.
You’re the hands-on expert—the builder of the digital world’s foundations. From racking GPUs to keeping the server room cool, you ensure the physical infrastructure of AI stands strong.

Learning Path:
- Start with CompTIA A+ and Server+ to master hardware and server basics.
- Level up with the EPI CDCP® (Certified Data Centre Professional) for power, cooling, and data center design.
- Begin your journey in data centers as a technician, and gain experience that scales directly into AI infrastructure roles.
`,

  cluster_commander: `
Congratulations! Your responses chosen mean you most align with the Cluster Commander.
You are the grand strategist of servers, commanding GPU clusters with precision. With Linux and Kubernetes as your weapons, you orchestrate armies of machines that train today’s largest AI models.

Learning Path:
- Learn Linux fundamentals and scripting for automation.
- Earn certifications like RHCSA and Certified Kubernetes Administrator (CKA).
- Explore NVIDIA’s specialized AI infrastructure training to gain an edge in high-performance computing.
`,

  cloud_architect: `
Congratulations! Your responses chosen mean you most align with the Cloud Architect.
You are the designer of vast digital realms—scalable, resilient, and automated. With AWS, Azure, or GCP at your fingertips, you shape the platforms where AI thrives.

Learning Path:
- Begin with an AWS Solutions Architect Associate or Azure Administrator Associate certification.
- Master Terraform for Infrastructure as Code.
- Advance into Platform Engineering or SRE (Site Reliability Engineering), building the backbone of the AI cloud.
`,

  model_launcher: `
Congratulations! Your responses chosen mean you most align with the Model Launcher.
You are the bridge between AI research and the real world. You take powerful models and make them work—fast, reliable, and at scale. As an MLOps expert, you turn code into production-ready intelligence.

Learning Path:
- Study CI/CD pipelines and containerization with Docker & Kubernetes.
- Earn certifications like CKAD (Certified Kubernetes Application Developer) and Cloud ML Specialties (AWS or Google).
- Practice deploying open-source LLMs and monitoring them in real-world environments.
`,

  data_master: `
Congratulations! Your responses chosen mean you most align with the Data Master.
AI is nothing without data—and you are the chef that prepares the feast. You design pipelines that transform raw data into structured, high-quality input that fuels learning.

Learning Path:
- Build strong foundations in SQL and Python.
- Explore big data tools like Spark and Kafka.
- Earn a Cloud Data Engineer certification (AWS, Azure, or GCP) to validate your ability to design large-scale pipelines.
`,

  network_weaver: `
Congratulations! Your responses chosen mean you most align with the Network Weaver.
You spin the threads of connectivity, building ultra-fast networks that keep AI clusters humming in perfect sync. In the age of AI, you ensure there are no bottlenecks, only speed.

Learning Path:
- Begin with Cisco CCNA, then advance to CCNP.
- Specialize with NVIDIA AI Networking certifications (NCP-AIN).
- Gain experience in high-performance networking environments—InfiniBand, RoCE, and data center fabrics.
`,

  security_guardian: `
Congratulations! Your responses chosen mean you most align with the Security Guardian.
You are the protector of the AI kingdom. From securing data pipelines to enforcing compliance, you safeguard the infrastructure against cyber threats and keep trust intact.

Learning Path:
- Start with cloud security foundations like AWS Certified Security - Specialty or Microsoft SC-900.
- Advance to Certified Kubernetes Security Specialist (CKS).
- Explore governance and compliance as AI regulations expand, positioning yourself at the forefront of AI security.
`,
};


/**
 * Audio files stored in /public/media.
 * Update file names to match your actual assets (mp3/ogg/wav supported by browsers).
 * Example path resolves to: public/media/hardware_hero.mp3 -> /media/hardware_hero.mp3
 */
const HERO_AUDIO: Record<HeroKey, string> = {
  hardware_hero: "/media/hardware.mp3",
  cluster_commander: "/media/cluster.mp3",
  cloud_architect: "/media/cloud.mp3",
  model_launcher: "/media/model.mp3",
  data_master: "/media/data.mp3",
  network_weaver: "/media/network.mp3",
  security_guardian: "/media/security.mp3",
};

/** Simple, accessible audio player */
function AudioSummary({
  src,
  accent = "#999",
  label = "Summary audio",
}: {
  src: string;
  accent?: string;
  label?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canPlay, setCanPlay] = useState(false);

  // Reset when source changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrent(0);
    setDuration(0);
    setCanPlay(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // Attempt to preload metadata
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      audioRef.current.load;
    }
  }, [src]);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Autoplay might be blocked; user can press again
      }
    }
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrent(audioRef.current.currentTime || 0);
  };
  const onLoadedMeta = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };
  const onCanPlay = () => setCanPlay(true);
  const onEnded = () => setIsPlaying(false);

  const fmt = (s: number) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
    };

  const pct = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (current / duration) * 100));
  }, [current, duration]);

  return (
    <div className="audio-summary">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMeta}
        onCanPlay={onCanPlay}
        onEnded={onEnded}
        aria-label={label}
      />
      <div
        className="audio-bar"
        style={{
          borderRadius: 12,
          padding: "0.75rem",
          border: "1px solid var(--border, rgba(255,255,255,0.12))",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.06))",
        }}
      >
        <div className="row items-center gap">
          <Button
            variant="ghost"
            onClick={toggle}
            aria-label={isPlaying ? "Pause summary audio" : "Play summary audio"}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <div
            className="audio-track"
            style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              className="track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={current}
              aria-label="Audio progress"
              onClick={(e) => {
                if (!audioRef.current || !duration) return;
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const x =
                  "clientX" in e ? (e as MouseEvent).clientX - rect.left : 0;
                const ratio = Math.min(1, Math.max(0, x / rect.width));
                audioRef.current.currentTime = ratio * duration;
              }}
              style={{
                position: "relative",
                height: 8,
                width: "100%",
                borderRadius: 8,
                background: "rgba(255,255,255,0.15)",
                cursor: canPlay ? "pointer" : "not-allowed",
              }}
            >
              <div
                className="fill"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${pct}%`,
                  borderRadius: 8,
                  background: accent,
                  transition: "width 120ms linear",
                }}
              />
            </div>
            <div className="time" style={{ opacity: 0.85, fontSize: 12 }}>
              {fmt(current)} / {fmt(duration)}
            </div>
          </div>
        </div>
        {/* Fallback native controls (visually hidden but accessible if needed) */}
        <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <audio controls src={src} aria-hidden />
        </div>
      </div>
    </div>
  );
}

export default function HeroResult({
  hero,
  onBackToQuiz,
  onGoToMap,
  onGoToAvatar,
}: {
  hero: HeroKey;
  onBackToQuiz: () => void;
  onGoToMap: () => void;
  onGoToAvatar?: () => void;
}) {
  const meta = HERO_META[hero];
  const img = HERO_IMAGES[hero];

  const summaryText = HERO_SUMMARY[hero];
  const audioSrc = HERO_AUDIO[hero];

  return (
    <div className="hero-result">
      {/* Compact header block */}
      <div className="result-card hero-head p-4 sm:p-5 text-center">
        <h3
          className="result-title text-xl sm:text-2xl font-bold mb-1"
          style={{ color: meta.accent }}
        >
          Your Hero Class: {meta.name}
        </h3>
        <p className="result-description text-sm sm:text-base leading-snug">
          {meta.blurb}
        </p>
      </div>

      <Card>
        <h2 className="hero-subtitle !text-center mb-3">
          Upgraded Hero Card
        </h2>

        {/* Centered, width-capped card */}
        <div className="hero-card-wrap flex justify-center">
          <div
            className="mtg-card selected"
            style={{ ["--accent" as any]: meta.accent }}
            aria-label={`${meta.name} upgrade`}
          >
            <div className="mtg-inner">
              <div className="mtg-titlebar">
                <span className="mtg-title">{meta.name}</span>
                <span className="rarity legendary" />
              </div>

              <div className="mtg-art">
                {img ? (
                  <img src={img} alt={`${meta.name} artwork`} />
                ) : (
                  <div className="foil" />
                )}
                <div className="foil" />
              </div>

              <div className="mtg-type">{meta.subtitle}</div>
              <div className="mtg-text">{meta.blurb}</div>

              <div className="mtg-footer">
                <span className="set">CQ • Alpha</span>
                <span className="sig">★</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Summary + Audio (UNDER the hero card) ---- */}
        <section
          className="hero-summary-block mt-6 sm:mt-8 text-center"
          aria-labelledby="hero-summary-title"
        >
          <h3
            id="hero-summary-title"
            className="!text-center text-lg sm:text-xl font-semibold mb-2"
            style={{ color: meta.accent }}
          >
            Your {meta.name} Summary
          </h3>

          <p className="text-sm sm:text-base leading-relaxed opacity-90 mb-4">
            {summaryText}
          </p>

          <AudioSummary src={audioSrc} accent={meta.accent} label={`${meta.name} audio summary`} />
        </section>

        <div className="row end gap mt-10">
          <Button variant="ghost" onClick={onBackToQuiz}>
            Review Quiz
          </Button>
          {onGoToAvatar && (
            <Button variant="outline" onClick={onGoToAvatar}>
              Change Avatar
            </Button>
          )}
          <Button onClick={onGoToMap}>Open Career Map</Button>
        </div>
      </Card>
    </div>
  );
}
