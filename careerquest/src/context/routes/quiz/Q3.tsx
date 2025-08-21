import React from "react";
setAnswer("q3", k);
navigate("/quiz/q4");
};


return (
<div className="space-y-4">
<h2 className="text-lg font-semibold">Q3: Pick your ultimate weapon!</h2>
<div className="grid gap-3">
<AnswerOption
label="🔌 Power Tools & Cables"
hint="→ Hardware Hero"
onClick={() => pick("hardwareHero")}
/>
<AnswerOption
label="🐧 Terminal Command Line"
hint="→ Cluster Commander"
onClick={() => pick("clusterCommander")}
/>
<AnswerOption
label="☁️ Terraform Spellbook"
hint="→ Cloud Architect"
onClick={() => pick("cloudArchitect")}
/>
<AnswerOption
label="🤖 AI Launcher Pad"
hint="→ Model Launcher"
onClick={() => pick("modelLauncher")}
/>
<AnswerOption
label="📊 Data Pipeline"
hint="→ Data Master"
onClick={() => pick("dataMaster")}
/>
<AnswerOption
label="🌐 Fiber Optic Blade"
hint="→ Network Weaver"
onClick={() => pick("networkWeaver")}
/>
<AnswerOption
label="🔒 Firewall Shield"
hint="→ Security Guardian"
onClick={() => pick("securityGuardian")}
/>
</div>
</div>
);
}