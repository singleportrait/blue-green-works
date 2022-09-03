import React from "react";
import { cn } from "../lib/helpers";

import * as styles from "./container.module.css";

const Container = ({ children, noFixedHeader }) => {
  return (
    <>
      <div className={cn(styles.container, noFixedHeader && styles.containerNoFixedHeader)}>
        {children}
      </div>
      <div id="portal" />
    </>
  );
};

export default Container;
