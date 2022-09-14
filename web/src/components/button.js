import React from "react";
import { Link } from "gatsby";

import { cn } from "../lib/helpers";

const Button = ({ text, link, targetBlank, fullWidth, className = "", internalLink }) => {
  if (internalLink) {
    return (
      <Link to={link} className={cn("button", fullWidth && "button--fullWidth", className)}>
        {text}
      </Link>
    );
  } else {
    return (
      <a
        href={link}
        className={cn("button", fullWidth && "button--fullWidth", className)}
        target={targetBlank && "_blank"}
        rel={targetBlank && "noopener noreferrer"}
      >
        {text}
      </a>
    );
  }
};

export default Button;
