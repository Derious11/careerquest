import React from "react";
import { useNavigate } from "react-router-dom";
import AnswerOption from "@/components/AnswerOption";
import { useQuiz, ClassKey } from "@/context/QuizContext";


export default function Q2() {
const { setAnswer } = useQuiz();
const navigate = useNavigate();
const pick = (k: ClassKey) => {
setAnswer("q2", k);
navigate("/quiz/q3");
};


return (
<div className="space-y-4">
<h2 className="text-lg font-semibold">Q2: Which activity sounds most fun to you?</h2>
<div className="grid gap-3">
<AnswerOption
                label="Building a custom PC or fixing gadgets 🖥️"
                hint="→ Hardware Hero"
                onClick={() => pick("hardwareHero")} icon={undefined}/>
<AnswerOption
                label="Writing scripts or tinkering with Linux 🐧"
                hint="→ Cluster Commander"
                onClick={() => pick("clusterCommander")} icon={undefined}/>
<AnswerOption
                label="Setting up cloud services or automating tasks ☁️"
                hint="→ Cloud Architect"
                onClick={() => pick("cloudArchitect")} icon={undefined}/>
<AnswerOption
                label="Deploying an AI model to the real world 🚀"
                hint="→ Model Launcher"
                onClick={() => pick("modelLauncher")} icon={undefined}/>
<AnswerOption
                label="Collecting & analyzing data 💧"
                hint="→ Data Master"
                onClick={() => pick("dataMaster")} icon={undefined}/>
<AnswerOption
                label="Connecting systems & making networks fast 🌐"
                hint="→ Network Weaver"
                onClick={() => pick("networkWeaver")} icon={undefined}/>
<AnswerOption
                label="Defending systems from hackers 🛡️"
                hint="→ Security Guardian"
                onClick={() => pick("securityGuardian")} icon={undefined}/>
</div>
</div>
);
}