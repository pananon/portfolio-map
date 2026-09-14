import React from 'react';
import { ExternalLink } from 'lucide-react';
export default function Projects({ projects }) {
  return <div className="grid md:grid-cols-2 gap-6">
    {projects.map(p => <article key={p.id} className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 md:p-8">
      <p className="text-blue-400 text-sm mb-3">{p.role}</p>
      <h3 className="text-2xl font-bold mb-4">{p.name}</h3>
      <p className="text-gray-300 leading-relaxed mb-5">{p.description}</p>
      <ul className="list-disc pl-5 space-y-2 text-gray-400 leading-relaxed mb-6">{p.achievements.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="flex flex-wrap gap-2 mb-6">{p.technologies.map(tech => <span key={tech} className="text-xs text-blue-200 bg-blue-900/20 rounded-full px-3 py-1">{tech}</span>)}</div>
      <div className="flex flex-wrap gap-5 text-sm">{[[p.url, p.github ? 'npm package' : 'Live site'], [p.playStore, 'Play Store'], [p.github, 'GitHub']].filter(([url]) => url).map(([url, label]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white underline underline-offset-4 hover:text-blue-300">{label}<ExternalLink size={14} /></a>)}</div>
    </article>)}
  </div>;
}
