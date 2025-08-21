import React, { createContext, useContext, useMemo, useState } from "react";

export type ClassKey = 
  | "hardwareHero"
  | "clusterCommander" 
  | "cloudArchitect"
  | "modelLauncher"
  | "dataMaster"
  | "networkWeaver"
  | "securityGuardian";

export type QuizAnswer = {
  q1?: ClassKey;
  q2?: ClassKey;
  q3?: ClassKey;
  q4?: ClassKey;
  q5?: ClassKey;
};

type QuizContextType = {
  answers: QuizAnswer;
  setAnswer: (q: keyof QuizAnswer, v: ClassKey) => void;
  clear: () => void;
  scores: Record<ClassKey, number>;
  winner: ClassKey | null;
};

const QuizContext = createContext<QuizContextType | null>(null);

const computeScores = (answers: QuizAnswer): Record<ClassKey, number> => {
  const scores: Record<ClassKey, number> = {
    hardwareHero: 0,
    clusterCommander: 0,
    cloudArchitect: 0,
    modelLauncher: 0,
    dataMaster: 0,
    networkWeaver: 0,
    securityGuardian: 0,
  };
  
  Object.values(answers).forEach(answer => {
    if (answer) scores[answer]++;
  });
  
  return scores;
};

const pickWinner = (scores: Record<ClassKey, number>): ClassKey | null => {
  const entries = Object.entries(scores) as [ClassKey, number][];
  const max = Math.max(...entries.map(([, score]) => score));
  if (max === 0) return null;
  return entries.find(([, score]) => score === max)?.[0] || null;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<QuizAnswer>({});

  const setAnswer = (q: keyof QuizAnswer, v: ClassKey) => {
    setAnswers((prev) => ({ ...prev, [q]: v }));
  };

  const clear = () => setAnswers({});

  const scores = useMemo(() => computeScores(answers), [answers]);
  const winner = useMemo(() => pickWinner(scores), [scores]);

  const value = useMemo(
    () => ({ answers, setAnswer, clear, scores, winner }),
    [answers, scores, winner]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = (): QuizContextType => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within <QuizProvider>");
  return ctx;
};
