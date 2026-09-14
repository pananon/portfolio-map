import React from 'react';
export default function Skills({ skills, awards }) {
  return <div className="space-y-8">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{Object.entries(skills.groups).map(([name, items]) => <article key={name} className="p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-5">{name}</h3>
      <ul className="flex flex-wrap gap-2">{items.map(item => <li key={item} className="text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2">{item}</li>)}</ul>
    </article>)}</div>
    <div className="grid md:grid-cols-2 gap-6">
      <article className="p-6 rounded-2xl bg-black/80 border border-white/10"><h3 className="text-xl font-bold mb-4">Certification</h3>{skills.certifications.map(item => <p key={item} className="text-gray-300">{item}</p>)}</article>
      <article className="p-6 rounded-2xl bg-black/80 border border-white/10"><h3 className="text-xl font-bold mb-4">Leadership & community</h3><ul className="space-y-2 text-gray-300">{awards.map(item => <li key={item}>{item}</li>)}</ul></article>
    </div>
  </div>;
}
