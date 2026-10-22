import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Icon from './Icon';
import SplitWords from './SplitWords';
import { useReveal } from '../lib/motion';

const EMPTY = { name: '', email: '', message: '' };

export default function Contact({ personal }) {
  const root = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  useReveal(root);

  const onChange = event => setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async event => {
    event.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        'service_43sevl4',
        'template_5p00xzp',
        { from_name: form.name, from_email: form.email, message: form.message },
        'fErXqUo4-g2Xe3fLD'
      );
      setForm(EMPTY);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" ref={root} className="contact" data-tone="signal" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="chapter-label mono" data-reveal>04 — Contact</p>
        <SplitWords as="h2" id="contact-title" className="contact-title" lines={['Have something', 'worth building?']} />

        <div className="contact-primary" data-reveal>
          <a className="contact-email" href={`mailto:${personal.email}`}>{personal.email}</a>
          <button type="button" className="contact-copy mono" onClick={copyEmail}>
            <Icon name={copied ? 'check-circle-linear' : 'copy-linear'} size={16} />
            {copied ? 'Copied' : 'Copy address'}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
        </div>

        <div className="contact-grid">
          <div className="contact-aside" data-reveal>
            <p className="contact-status mono"><span aria-hidden="true" />Open to full-time roles and freelance projects</p>
            <p>
              Whether it is a product idea, an AI feature that needs a real interface, or a team that needs a senior
              frontend engineer, I am happy to talk it through.
            </p>
            <p className="contact-base mono"><Icon name="map-point-linear" size={16} /> Based in Hyderabad, India</p>
          </div>

          {status === 'sent' ? (
            <div className="contact-sent" role="status">
              <Icon name="check-circle-linear" size={32} />
              <p className="contact-sent-title">Message sent.</p>
              <p>Thank you for reaching out. I will get back to you soon.</p>
              <button type="button" className="btn btn-ink" onClick={() => setStatus('idle')}>Send another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} data-reveal>
              <div className="field">
                <label htmlFor="name" className="mono">Name</label>
                <input id="name" name="name" autoComplete="name" required value={form.name} onChange={onChange} placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="email" className="mono">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} placeholder="you@company.com" />
              </div>
              <div className="field field-wide">
                <label htmlFor="message" className="mono">Message</label>
                <textarea id="message" name="message" rows={4} required value={form.message} onChange={onChange} placeholder="What are you working on?" />
              </div>
              <div className="form-foot field-wide">
                <button type="submit" className="btn btn-ink" disabled={status === 'sending'}>
                  {status === 'sending' ? <><span className="spinner" aria-hidden="true" /> Sending</> : <>Send message <Icon name="plain-linear" /></>}
                </button>
                <p className="form-error" role="alert">
                  {status === 'error' && <><Icon name="danger-triangle-linear" size={16} /> That did not go through. Please try again, or email me directly.</>}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
