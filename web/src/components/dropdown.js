import React, { useState, useRef, useEffect } from 'react';

import Arrow from './arrow';
import { cn } from '../lib/helpers';

import * as styles from './dropdown.module.scss';

const Dropdown = ({tearSheets, reversed}) => {
  const node = useRef();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setDropdownIsOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownIsOpen]);

  return (
    <div ref={node} className={cn(styles.dropdown, 'label')}>
      <div
        className={cn(
          'button',
          styles.dropdownTrigger,
          reversed && styles.dropdownReversed,
        )}
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
      >
        <span>Tear Sheets</span>
        <Arrow reversed={dropdownIsOpen} />
      </div>

      { dropdownIsOpen &&
        <div className={cn(styles.dropdownMenu)}>
          {tearSheets.map((tearSheet) =>
            <a
              key={tearSheet._key}
              href={tearSheet.PDF.asset.url}
              className={styles.dropdownMenuLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              {tearSheet.title}
            </a>,
          )}
        </div>
      }
    </div>
  );
}

export default Dropdown;
