"use client"
import React from 'react';
import styled from 'styled-components';

const GlowingButtonReverse = ({ text }: { text: string }) => {
  return (
    <StyledWrapper>
      <button id="bottone1"><strong>{text}</strong></button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #bottone1 {
   padding-left: 33px;
   padding-right: 33px;
   padding-bottom: 12px;
   padding-top: 12px;
   border-radius: 9px;
   background: #020617;
   border: 1px solid white;
   font-family: inherit;
   text-align: center;
   cursor: pointer;
   transition: 0.4s;
   color: white;
   min-width: 220px;
  }

  #bottone1:hover {
   box-shadow: 7px 5px 56px -14px rgba(255, 255, 255, 0.75);
  }

  #bottone1:active {
   transform: scale(0.97);
   box-shadow: 7px 5px 56px -10px rgba(255, 255, 255, 0.75);
  }`;

export default GlowingButtonReverse;
