// src/components/CareerMap.tsx
import React, { useEffect, useState, useCallback } from 'react'
import { Card, Button } from './UI'
import type { PlayerProfile } from '../types';

const TRACKS = [
  { id: 'hardware', title: 'Hardware Hero', tasks: ['Tour a data center (virtual OK)', 'Build a PC part list under $1,000', 'Learn ESD & rack safety basics'] },
  { id: 'linux',   title: 'Cluster Commander', tasks: ['Install Linux in a VM', 'Write 3 bash scripts', 'Run a container with GPU (if available)'] },
  { id: 'cloud',   title: 'Cloud Architect', tasks: ['Create a free-tier cloud account', 'Deploy a static site', 'Write a simple IaC template'] },
]

export default function CareerMap({ profile, onBack }: { profile: PlayerProfile; onBack: () => void }) {
  return (
    <Card>
      <h2>Career Map</h2>
      <p className="muted">
        {profile.displayName || 'Explorer'}.
        Complete real‑world tasks below. Completing a track unlocks your <strong>the next level</strong>.
      </p>

      <div className="tracks">
        {TRACKS.map((t) => (
          <section key={t.id} className="track">
            <header className="track-head">
              <h3>{t.title}</h3>
              <small>{t.tasks.length} tasks</small>
            </header>
            <ul>
              {t.tasks.map((task, i) => (
                <TaskItem key={`${t.id}-${i}`} trackId={t.id} index={i} label={task} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="row between">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button variant="outline" onClick={() => alert('Future: export progress as JSON/PDF')}>Export Progress</Button>
      </div>
    </Card>
  )
}

function TaskItem({ trackId, index, label }: { trackId: string; index: number; label: string }) {
  const storageKey = `cq.task.${trackId}.${index}`
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCompleted(localStorage.getItem(storageKey) === '1')
  }, [storageKey])

  const toggle = useCallback(() => {
    const next = !completed
    setCompleted(next)
    localStorage.setItem(storageKey, next ? '1' : '0')
  }, [completed, storageKey])

  return (
    <li>
      <label className={`task ${completed ? 'done' : ''}`}>
        <input type="checkbox" checked={completed} onChange={toggle} />
        <span>{label}</span>
      </label>
    </li>
  )
}
