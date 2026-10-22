import React, { useRef } from 'react';
import Icon from './Icon';
import SplitWords from './SplitWords';
import { useReveal } from '../lib/motion';

// One muted colour field per project, keyed by project id.
const FIELDS = { 1: '#3b4026', 2: '#5b3125', 3: '#2c3250', 4: '#22383e' };

const hostOf = url => new URL(url).hostname.replace(/^www\./, '');

function ProjectCover({ project, index, total }) {
  const [shortName] = project.name.split(' — ');
  return (
    <div className="project-cover" data-reveal-mask aria-hidden="true">
      <div className="project-cover-layer">
        <div className="project-cover-top mono">
          <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <span>{hostOf(project.url)}</span>
        </div>
        <p className="project-cover-name">{shortName}</p>
        <div className="project-cover-foot mono">{project.technologies.join(' · ')}</div>
      </div>
    </div>
  );
}

function Project({ project, index, total }) {
  const [shortName, subtitle] = project.name.split(' — ');
  const actions = [
    [project.url, project.github ? 'npm package' : 'Live site'],
    [project.playStore, 'Google Play'],
    [project.github, 'Source on GitHub'],
  ].filter(([url]) => url);

  return (
    <article className="project" style={{ '--field': FIELDS[project.id] ?? '#2a2d2c' }} aria-labelledby={`project-${project.id}`}>
      <ProjectCover project={project} index={index} total={total} />
      <div className="project-body">
        <p className="project-role mono" data-reveal>{project.role}</p>
        <h3 id={`project-${project.id}`} className="project-title">
          <SplitWords text={shortName} />
          {subtitle && <span className="project-subtitle">{subtitle}</span>}
        </h3>
        <p className="project-description" data-reveal>{project.description}</p>
        <ul className="project-points" data-reveal-stagger>
          {project.achievements.map(item => <li key={item}>{item}</li>)}
        </ul>
        <ul className="tag-row" aria-label="Technologies">
          {project.technologies.map(tech => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="project-actions">
          {actions.map(([url, label]) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-link">
              {label} <Icon name="arrow-right-up-linear" size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Work({ projects }) {
  const root = useRef(null);
  useReveal(root);
  return (
    <section id="work" ref={root} className="work" data-tone="dark" aria-labelledby="work-title">
      <div className="wrap">
        <header className="chapter-head">
          <p className="chapter-label mono" data-reveal>01 — Selected work</p>
          <SplitWords as="h2" id="work-title" className="chapter-title" text="Products I founded, built and shipped." />
          <p className="chapter-note" data-reveal>
            Side projects that became real products: AI tooling, fitness platforms on the Play Store, and an open-source React library.
          </p>
        </header>
        <div className="project-list">
          {projects.map((project, index) => <Project key={project.id} project={project} index={index} total={projects.length} />)}
        </div>
      </div>
    </section>
  );
}
