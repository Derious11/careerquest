import React from "react";
import AnswerOption from "@/components/AnswerOption";
import { useQuiz, ClassKey } from "@/context/QuizContext";
import { useNavigate } from "react-router-dom";


export default function Q4() {
const { setAnswer } = useQuiz();
const navigate = useNavigate();
const pick = (k: ClassKey) => {
setAnswer("q4", k);
navigate("/quiz/q5");
};


return (
<div className="space-y-4">
<h2 className="text-lg font-semibold">Q4: In a big challenge, how do you win?</h2>
<div className="grid gap-3">
<AnswerOption
                label="Get hands‑on, fix it directly 🖥️"
                hint="→ Hardware Hero"
                onClick={() => pick("hardwareHero")} icon={undefined}/>
<AnswerOption
                label="Coordinate systems to work together 🐧"
                hint="→ Cluster Commander"
                onClick={() => pick("clusterCommander")} icon={undefined}/>
<AnswerOption
                label="Design a smart system that scales ☁️"
                hint="→ Cloud Architect"
                onClick={() => pick("cloudArchitect")} icon={undefined}/>
<AnswerOption
                label="Deploy a solution for real‑world use 🚀"
                hint="→ Model Launcher"
                onClick={() => pick("modelLauncher")} icon={undefined}/>
<AnswerOption
                label="Use data to make the best decisions 💧"
                hint="→ Data Master"
                onClick={() => pick("dataMaster")} icon={undefined}/>
<AnswerOption
                label="Make sure everyone can connect & communicate 🌐"
                hint="→ Network Weaver"
                onClick={() => pick("networkWeaver")} icon={undefined}/>
<AnswerOption
                label="Keep everything safe & secure 🛡️"
                hint="→ Security Guardian"
                onClick={() => pick("securityGuardian")} icon={undefined}/>
</div>
</div>
);
}