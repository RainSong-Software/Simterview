"use client"
import React from 'react';
import styled from 'styled-components';

const GlowingButton = ({ text }: { text: string }) => {
  return (
    <StyledWrapper>
      <button> {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   --glow-color: rgba(255, 255, 255, 0.8); /* Slightly reduced opacity for base glow */
   --glow-spread-color: rgba(255, 255, 255, 0.4); /* Reduced opacity for spread */
   --enhanced-glow-color: rgba(255, 255, 255, 0.8); /* Consistent with glow-color */
   --btn-color: transparent; /* <<< CHANGED: Button background transparent by default */
   --text-color-default: rgb(255,255,255); /* Purple text */
   --text-color-hover: rgb(0,0,0); /* Purple text on hover, can be changed */
   --hover-bg-color: white; /* Background on hover */

   border: .2em solid var(--glow-color); /* Slightly thinner border */
   padding: 1em 3em;
   color: var(--text-color-default); /* Purple text */
   font-size: 15px;
   font-weight: bold;
   background-color: var(--btn-color); /* Transparent background */
   border-radius: 1em;
   outline: none;
   box-shadow: 0 0 0.5em 0.1em var(--glow-color), /* Reduced main glow */
          0 0 1.5em 0.3em var(--glow-spread-color), /* Reduced spread glow */
          inset 0 0 0.5em 0.1em var(--glow-color); /* Reduced inset glow */
   text-shadow: 0 0 0.25em var(--glow-color); /* Reduced text shadow */
   position: relative;
   transition: all 0.3s;
  }

  /*
  button::after {
   pointer-events: none;
   content: "";
   position: absolute;
   top: 120%;
   left: 0;
   height: 100%;
   width: 100%;
   background-color: var(--glow-spread-color); 
   filter: blur(2em);
   opacity: .7;
   transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
  }
  */

  button:hover {
   color: var(--text-color-hover); /* Text color on hover */
   background-color: var(--hover-bg-color); /* White background on hover */
   box-shadow: 0 0 0.6em 0.15em var(--glow-color), /* Reduced hover main glow */
          0 0 2em 0.5em var(--glow-spread-color),  /* Reduced hover spread glow */
          inset 0 0 0.6em 0.15em var(--glow-color); /* Reduced hover inset glow */
  }

  button:active {
   box-shadow: 0 0 0.4em 0.1em var(--glow-color), /* Reduced active main glow */
          0 0 1.5em 0.5em var(--glow-spread-color), /* Reduced active spread glow */
          inset 0 0 0.4em 0.1em var(--glow-color); /* Reduced active inset glow */
  }`;

export default GlowingButton;
