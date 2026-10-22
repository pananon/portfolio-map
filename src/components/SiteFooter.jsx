import React from 'react';
import Icon from './Icon';

export default function SiteFooter({ personal }) {
  const links = [
    [personal.links.linkedin, 'LinkedIn'],
    [personal.links.github, 'GitHub'],
    [personal.links.codechef, 'CodeChef'],
    [personal.links.personalSite, 'mangalcore.com'],
  ];
  return (
    <footer className="site-footer" data-tone="dark">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">{personal.name}</p>
          <p className="footer-muted">{personal.title}</p>
        </div>
        <div>
          <p className="footer-label mono">Base</p>
          <p>Hyderabad, India</p>
        </div>
        <nav aria-label="Elsewhere">
          <p className="footer-label mono">Elsewhere</p>
          <ul>
            {links.map(([url, label]) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-link">
                  {label} <Icon name="arrow-right-up-linear" size={14} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-legal">
          <p>© {new Date().getFullYear()} {personal.name}</p>
          <p className="footer-muted">
            Earth texture from the three.js examples, derived from NASA imagery. Icons: Solar by 480 Design, CC BY 4.0.
          </p>
          <a href="#top" className="text-link mono">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
