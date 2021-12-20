import React from 'react';
import { Link } from "gatsby";

import { cn } from '../lib/helpers';

const Button = ({
  text,
  link,
  targetBlank,
  filled,
  fullWidth,
  light,
  largePadding,
  className = '',
  internalLink,
}) => {
  if (internalLink) {
    return (
      <Link
        to={link}
        className={cn(
          'button',
          filled && 'button--filled',
          fullWidth && 'button--fullWidth',
          light && 'button--light',
          largePadding && 'button--largePadding',
          className
        )}
      >
        {text}
      </Link>
    );
  } else {
    return (
      <a
        href={link}
        className={cn(
          'button',
          filled && 'button--filled',
          fullWidth && 'button--fullWidth',
          light && 'button--light',
          largePadding && 'button--largePadding',
          className
        )}
        target={targetBlank && '_blank'}
        rel={targetBlank && 'noopener noreferrer'}
      >
        {text}
      </a>
    );
  }
}

export default Button;
