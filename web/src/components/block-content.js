import { PortableText } from "@portabletext/react";
import React from "react";
import clientConfig from "../../client-config";
import { cn } from "../lib/helpers";

import * as styles from "./blockContent.module.scss";

const BlockContent = ({ blocks = [], className = "" }) => (
  <div className={cn(className, styles.blockContent)}>
    <PortableText value={blocks} {...clientConfig.sanity} />
  </div>
);

export default BlockContent;
