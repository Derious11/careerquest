import React from "react";
import { useNavigate } from "react-router-dom";
import { AnswerOption } from "@/components/AnswerOption";
import { useQuiz, ClassKey } from "@/context/QuizContext";


export default function Q5() {
const { setAnswer } = useQuiz();
const navigate = useNavigate();
const pick = (k: ClassKey) => {
setAnswer("q5", k);
navigate("/quiz/result");
};


return (
<div className="space-y-4">
<h2 className="text-lg font-semibold">Q5 (Tie‑breaker): Which boss fight excites you the most?</h2>
<div className="grid gap-3">
<AnswerOption
label="Power outage in a server room ⚡"
hint="→ Hardware Hero"
onClick={() => pick("hardwareHero")}
/>
<AnswerOption
label="Managing 100s of servers at once 🖥️"
hint="→ Cluster Commander"
onClick={() => pick("clusterCommander")}
/>
<AnswerOption
label="Designing a global cloud system 🌍"
hint="→ Cloud Architect"
onClick={() => pick("cloudArchitect")}
/>
<AnswerOption
label="Getting an AI model to run for millions of users 🤖"
hint="→ Model Launcher"
onClick={() => pick("modelLauncher")}
/>
<AnswerOption
label="Feeding AI with clean, fast data 🍽️"
hint="→ Data Master"
onClick={() => pick("dataMaster")}
/>
<AnswerOption
label="Building ultra‑fast networks 🚄"
}