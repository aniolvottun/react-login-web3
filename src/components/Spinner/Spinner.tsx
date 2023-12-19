import React from 'react';
import styled, { keyframes } from 'styled-components';

export const Spinner: React.FC = () => {
  const spinAnimation = keyframes`
    to {
      transform: rotate(360deg);
    }`;

  const SpinnerContainer = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #fff;
    animation: ${spinAnimation} 1s linear infinite;
  `;

  return <SpinnerContainer />;
};
