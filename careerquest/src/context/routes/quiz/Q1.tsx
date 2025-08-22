import React from "react";
import { useNavigate } from "react-router-dom";
import  AnswerOption  from "@/components/AnswerOption";
import { useQuiz, ClassKey } from "@/context/QuizContext";


export default function Q1() {
const { setAnswer } = useQuiz();
const navigate = useNavigate();


const pick = (k: ClassKey) => {
setAnswer("q1", k);
navigate("/quiz/q2");
};


return (
<div className="space-y-4">
<h2 className="text-lg font-semibold">Q1: When you’re in a team, what role do you usually take?</h2>
<div className="grid gap-3">
<AnswerOption
                label="⚒️ Builder"
                hint="Hardware Hero, Data Master"
                onClick={() => pick("hardwareHero")} icon={undefined}/>
<AnswerOption
                label="🧭 Strategist"
                hint="Cluster Commander, Cloud Architect"
                onClick={() => pick("cloudArchitect")} icon={undefined}/>
<AnswerOption
                label="🚀 Innovator"
                hint="Model Launcher"
                onClick={() => pick("modelLauncher")} icon={undefined}/>
<AnswerOption
                label="🛡️ Protector"
                hint="Security Guardian, Network Weaver"
                onClick={() => pick("securityGuardian")} icon={undefined}/>
</div>
</div>
);
}