// src/components/IntroScreen.tsx
import React, { useRef, useState } from 'react'
import { Button, Field } from './UI'
import type { PlayerProfile } from '../types'

const Spline = ({ scene, onLoad }: { scene?: string; onLoad?: () => void }) => {
  if (onLoad) onLoad()
  return null
}

type Props = {
  value: PlayerProfile
  onChange: (p: Partial<PlayerProfile>) => void
  onContinue: () => void
  onStartQuiz?: () => void
  splineScene?: string
}

export default function IntroScreen({
  value,
  onChange,
  onContinue,
  onStartQuiz: _onStartQuiz,
  splineScene,
}: Props) {
  // Continue when display name has content
  const canContinue = (value.displayName?.trim().length ?? 0) > 0

  // --- audio state ---
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="intro-wrapper">
      {/* Background */}
      <div className="spline-bg" aria-hidden="true">
        {splineScene ? <Spline scene={splineScene} onLoad={() => {}} /> : <div className="fallback-bg" />}
        <div className="frost-gradient" />
      </div>

      {/* Foreground */}
      <div className="intro-overlay">
        <div className="glass-panel">
          <div className="brand row items-center gap-2 mb-3">
            <span className="brand-mark">CQ</span>
            <span className="brand-name">CareerQuest</span>
          </div>

          <h2 className="hero-title">
            From <span className="accent">Gamer</span> to <span className="accent-2">AI Pro</span>
          </h2>
          <p className="muted">
            Start as an apprentice in rags. Complete real-world quests to unlock your <b>hero class</b>.
          </p>

          {/* Narration Controls */}
          <div className="narration mt-6">
            <audio
              ref={audioRef}
              src="/media/intro-voice.mp3"
              preload="auto"
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              muted={isMuted}
            />
            <div className="row gap items-center" style={{ width: '100%', justifyContent: 'center' }}>
              <Button variant="primary" onClick={togglePlay}>
                {isPlaying ? 'Pause Narration' : 'Play Narration'}
              </Button>
              <Button variant="ghost" onClick={() => setIsMuted(m => !m)}>
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
          </div>

          {/* Profile setup (centered) */}
          <div className="mt-12" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 420 }}>
              <Field label="Display name">
                <input
                  placeholder="e.g. SkyBuilder"
                  value={value.displayName}
                  onChange={(e) => onChange({ displayName: e.target.value })}
                  maxLength={24}
                />
              </Field>
            </div>
          </div>

          {/* Navigation (centered) */}
          <div className="row gap mt-10" style={{ width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="ghost" onClick={() => onChange({ displayName: '' })}>
              Clear
            </Button>
            <Button onClick={onContinue} disabled={!canContinue}>
              Choose Avatar
            </Button>
          </div>

          <small className="muted block mt-4">Progress saves locally to your browser.</small>
        </div>
      </div>
    </div>
  )
}
