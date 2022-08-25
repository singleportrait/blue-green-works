import React from 'react';
import { PortableText } from '@portabletext/react';
import clientConfig from '../../client-config';
import { cn } from '../lib/helpers';

import * as styles from './blockContent.module.scss';

import { Figure } from './figure';

const components = {
  types: {
    figure: Figure,
  },
};

const BlockContent = ({ blocks = [], className = '' }) => (
  <div className={cn(className, styles.blockContent)}>
    <PortableText
      value={blocks}
      components={components}
      {...clientConfig.sanity}
    />
  </div>
);

export default BlockContent;
