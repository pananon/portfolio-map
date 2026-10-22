import React from 'react';
import { Icon as Iconify, addCollection } from '@iconify/react';
import solar from '../data/solarIcons.json';

// Solar icons by 480 Design (CC BY 4.0), bundled locally so no icon API calls are made.
addCollection(solar);

export default function Icon({ name, size = 18, className, label }) {
  return (
    <Iconify
      icon={`solar:${name}`}
      width={size}
      height={size}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
