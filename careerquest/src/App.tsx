// src/App.tsx
import { useEffect, useMemo, useState } from 'react'
import IntroScreen from './components/IntroScreen'
import AvatarSelector from './components/AvatarSelector'
import CareerMap from './components/CareerMap'
import QuizJourney from './components/QuizJourney'
import HeroResult from './components/HeroResult'
import type { Step } from './types'
import type { PlayerProfile } from './types'
import './App.css'
import './styles.css'

const STORAGE_KEY = 'careerquest.profile.v1'

export default function App() {
  const [step, setStep] = useState<Step>('intro')
  const [heroClass, setHeroClass] = useState<string | null>(null)

  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : { gender: 'unspecified', avatarId: null, displayName: '' }
    } catch {
      return { gender: 'unspecified', avatarId: null, displayName: '' }
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const canContinueToMap = useMemo(
    () => profile.avatarId !== null && profile.gender !== 'unspecified',
    [profile]
  )

// In App.tsx

// In App.tsx

return (
  <>
    {step === 'intro' ? (
      // If it's the intro step, render ONLY the IntroScreen
      <IntroScreen
        value={profile}
        onChange={(p) => setProfile((prev) => ({ ...prev, ...p }))}
        onContinue={() => setStep('avatar')}
        onStartQuiz={() => setStep('quiz')}
      />
    ) : (
      // For all other steps, render the main app layout
      <div className="app-shell">
        <header className="app-header">
          <h1>CareerQuest</h1>
          <nav>
            {/* The "Home" button has been removed from here */}
            <button className={step === 'avatar' ? 'active' : ''} onClick={() => setStep('avatar')}>
              Avatar
            </button>
          </nav>
        </header>

        <main className="app-main">
          {step === 'avatar' && (
            <AvatarSelector
              gender={profile.gender}
              selectedId={profile.avatarId}
              onBack={() => setStep('intro')}
              onSelect={(id) => setProfile((p) => ({ ...p, avatarId: id }))}
              onContinue={() => setStep('quiz')}
            />
          )}

          {step === 'map' && <CareerMap profile={profile} onBack={() => setStep('avatar')} />}

          {step === 'quiz' && (
            <QuizJourney
              onBack={() => setStep('intro')}
              onComplete={(hero) => {
                setHeroClass(hero)
                setStep('result')
              }}
            />
          )}

          {step === 'result' && heroClass && (
            <HeroResult
              hero={heroClass as any}
              onBackToQuiz={() => setStep('quiz')}
              onGoToMap={() => setStep('map')}
              onGoToAvatar={() => setStep('avatar')}
            />
          )}
        </main>

        <footer className="app-footer">
          <small>Local prototype · progress saved to your browser</small>
          <button
            className="link"
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY)
              localStorage.removeItem('careerquest.quiz.v1')
              location.reload()
            }}
          >
            Reset Progress
          </button>
        </footer>
      </div>
    )}
  </>
)
}


