import React from 'react';
import { cn } from '../lib/helpers';

const Button = ({text, link, targetBlank, filled, fullWidth, light, className = ''}) => {
  return (
    <a
      href={link}
      className={cn(
        'button',
        filled && 'button--filled',
        fullWidth && 'button--fullWidth',
        light && 'button--light',
        className
      )}
      target={targetBlank && '_blank'}
      rel={targetBlank && 'noopener noreferrer'}
    >
      {text}
    </a>
  );
}

export default Button;
