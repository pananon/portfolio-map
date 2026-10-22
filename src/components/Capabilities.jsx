import React, { useRef, useState } from 'react';
import Icon from './Icon';
import SplitWords from './SplitWords';
import { useReveal } from '../lib/motion';

function Capability({ name, items, index }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const panelId = `capability-${index}`;
  const onKeyDown = event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      trigger.current?.focus();
    }
  };
  return (
    <li className="cap-item" onKeyDown={onKeyDown}>
      <h3>
        <button
          ref={trigger}
          type="button"
          className="cap-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(value => !value)}
        >
          <span className="cap-count mono">{String(items.length).padStart(2, '0')}</span>
          <span className="cap-name">{name}</span>
          <Icon name={open ? 'minus-circle-linear' : 'add-circle-linear'} size={28} className="cap-icon" />
        </button>
      </h3>
      <div id={panelId} className="cap-panel" hidden={!open}>
        <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </li>
  );
}

export default function Capabilities({ skills, awards }) {
  const root = useRef(null);
  useReveal(root);
  return (
    <section id="capabilities" ref={root} className="capabilities" data-tone="light" aria-labelledby="capabilities-title">
      <div className="wrap">
        <header className="chapter-head">
          <p className="chapter-label mono" data-reveal>03 — Capabilities</p>
          <SplitWords as="h2" id="capabilities-title" className="chapter-title" text="What I bring to a product team." />
          <p className="chapter-note" data-reveal>Open any discipline for the tools behind it.</p>
        </header>

        <ul className="cap-list" data-reveal-stagger>
          {Object.entries(skills.groups).map(([name, items], index) => (
            <Capability key={name} name={name} items={items} index={index} />
          ))}
        </ul>

        <div className="beyond">
          <h3 className="beyond-title mono" data-reveal>Beyond the code</h3>
          <div className="beyond-grid" data-reveal-stagger>
            <div>
              <h4 className="mono">Certification</h4>
              {skills.certifications.map(item => <p key={item}>{item}</p>)}
            </div>
            <div>
              <h4 className="mono">Leadership & community</h4>
              <ul>{awards.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h4 className="mono">Languages</h4>
              <p>{skills.languages.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
