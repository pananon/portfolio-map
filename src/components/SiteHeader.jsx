import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { ScrollTrigger, getLenis } from '../lib/motion';

const LINKS = [
  ['#work', 'Work'],
  ['#journey', 'Journey'],
  ['#capabilities', 'Capabilities'],
];

export default function SiteHeader() {
  const [tone, setTone] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // Header tone follows the section currently under it.
  useEffect(() => {
    const triggers = [...document.querySelectorAll('[data-tone]')].map(el => ScrollTrigger.create({
      trigger: el,
      start: 'top 36px',
      end: 'bottom 36px',
      onToggle: self => self.isActive && setTone(el.dataset.tone),
    }));
    const pastTop = ScrollTrigger.create({ start: 48, end: 'max', onToggle: self => setScrolled(self.isActive) });
    return () => {
      triggers.forEach(trigger => trigger.kill());
      pastTop.kill();
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector('a')?.focus();
    const onKey = event => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = [...menuRef.current.querySelectorAll('a, button')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lenis?.start();
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="site-header" data-tone={open ? 'dark' : tone} data-scrolled={scrolled || undefined}>
      <a href="#top" className="site-mark" aria-label="Hari Mangal Pandey, back to top">
        <span>Hari Mangal Pandey</span>
        <span className="site-mark-sub mono">Field atlas</span>
      </a>
      <nav className="site-nav" aria-label="Primary">
        {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        <a href="#contact" className="site-nav-cta">Contact</a>
      </nav>
      <button
        ref={toggleRef}
        type="button"
        className="site-menu-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(value => !value)}
      >
        <span className="mono">{open ? 'Close' : 'Menu'}</span>
        <Icon name={open ? 'close-circle-linear' : 'hamburger-menu-linear'} size={20} />
      </button>
      {open && (
        <div id="site-menu" ref={menuRef} className="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <nav aria-label="Mobile">
            {[...LINKS, ['#contact', 'Contact']].map(([href, label], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>{label}
              </a>
            ))}
          </nav>
          <button type="button" className="site-menu-close mono" onClick={() => setOpen(false)}>Close menu</button>
        </div>
      )}
    </header>
  );
}
