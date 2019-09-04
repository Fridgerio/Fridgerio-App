import React from 'react';
import styled from 'styled-components/native';
import { Colors, FontSize } from './Variables';

// Headings
const h1 = 'font-size: 22px;';
const h2 = 'font-size: 20px;';
const h3 = 'font-size: 19px;';
const h4 = 'font-size: 18px;';
const h5 = 'font-size: 17px;';
const h6 = 'font-size: 16px;';

const StyledHeading = styled.Text`
  color: ${props => props.color || Colors.TertiaryColor};
  font-size: ${props => props.size || FontSize.large};
  margin: ${props => props.margin || '25px 0 10px 0'};
  flex: ${props => props.flex || 'none'};
`;

export const Heading = props => (
  <StyledHeading
    color={props.color}
    size={props.size}
    margin={props.margin}
    flex={props.flex}
  >
    {props.title}
  </StyledHeading>
);

// Text align
// Block
const StyledBlockText = styled.Text`
  text-align: justify;
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.size || FontSize.normal};
`;
export const BlockText = props => (
  <StyledBlockText margin={props.margin}>{props.children}</StyledBlockText>
);
