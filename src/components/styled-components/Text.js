import React from 'react';
import styled from 'styled-components/native';
import { Colors } from './Variables';

// Headings
const h1 = 'font-size: 22px; margin: 25px 0 10px 0;';
const h2 = 'font-size: 20px; margin: 25px 0 10px 0;';
const h3 = 'font-size: 19px; margin: 25px 0 10px 0;';
const h4 = 'font-size: 18px; margin: 25px 0 10px 0;';
const h5 = 'font-size: 17px; margin: 25px 0 10px 0;';
const h6 = 'font-size: 16px; margin: 25px 0 10px 0;';

const StyledHeading = styled.Text`
  color: ${props => props.color || Colors.TertiaryColor};
  ${props => (props.h1 ? h1 : null)}
  ${props => (props.h2 ? h2 : null)}
  ${props => (props.h3 ? h3 : null)}
  ${props => (props.h4 ? h4 : null)}
  ${props => (props.h5 ? h5 : null)}
  ${props => (props.h6 ? h6 : null)}
`;

export const Heading = props => (
  <StyledHeading
    h1={props.h1}
    h2={props.h2}
    h3={props.h3}
    h4={props.h4}
    h5={props.h5}
    h6={props.h6}
  >
    {props.children}
  </StyledHeading>
);

// Text align
// Block
const StyledBlockText = styled.Text`
  text-align: justify;
  margin: ${props => props.margin || '0'};
`;
export const BlockText = props => (
  <StyledBlockText margin={props.margin}>{props.children}</StyledBlockText>
);
