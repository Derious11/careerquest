import React from "react";
<div className="space-y-6">
<div className="text-center">
<h2 className="text-2xl font-bold">You are the {meta.icon} {meta.label}!</h2>
<p className="mt-2 text-slate-400">{meta.blurb}</p>
</div>


{/* Simple bar list of scores */}
<div>
<h3 className="mb-2 font-semibold">Your alignment</h3>
<ul className="space-y-2">
{(Object.entries(scores) as [keyof typeof scores, number][])
.sort((a, b) => b[1] - a[1])
.map(([k, v]) => (
<li key={k} className="flex items-center gap-2">
<div className="w-44 shrink-0 text-sm capitalize">
{CLASS_META[k as keyof typeof CLASS_META].icon}{" "}
{CLASS_META[k as keyof typeof CLASS_META].label}
</div>
<div className="h-2 w-full rounded bg-white/10">
<div
className="h-2 rounded bg-white/70"
style={{ width: `${(v / Math.max(1, scores[winner])) * 100}%` }}
/>
</div>
<span className="w-8 text-right text-xs tabular-nums">{v}</span>
</li>
))}
</ul>
</div>


<div className="flex flex-wrap gap-3">
<button
onClick={restart}
className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 hover:bg-white/10"
>
Retake Quiz
</button>
<Link
to="/quests"
className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
>
Begin Your Quest
</Link>
</div>
</div>
);
}