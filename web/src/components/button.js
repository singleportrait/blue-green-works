import React from 'react';
import { cn } from '../lib/helpers';

const Button = ({text, link, targetBlank, reversed, fullWidth}) => {
  return (
    <a
      href={link}
      className={cn(
        'button',
        reversed && 'button--reversed',
        fullWidth && 'button--fullWidth'
      )}
      target={targetBlank && '_blank'}
      rel={targetBlank && 'noopener noreferrer'}
    >
      {text}
    </a>
  );
}

export default Button;
