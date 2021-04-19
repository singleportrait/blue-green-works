import React from 'react';
import { css } from '@emotion/react';

const reversed = css`
  transform: rotate(180deg);
`;

const Arrow = (props) => {
  return (
    <svg width="14" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" css={props.reversed && reversed}>
      <path d="M7 13L.072 1h13.856L7 13z" fill="#111"/>
    </svg>
  );
}

export default Arrow;
