import BaseBlockContent from "@sanity/block-content-to-react";
import React from "react";
import clientConfig from "../../client-config";
import serializers from "./serializers";
import { cn } from "../lib/helpers";

import * as styles from './blockContent.module.scss';

const BlockContent = ({ blocks = [], className = '' }) => (
  <BaseBlockContent
    className={cn(className, styles.blockContent)}
    renderContainerOnSingleChild={true}
    blocks={blocks}
    serializers={serializers}
    {...clientConfig.sanity}
  />
);

export default BlockContent;
