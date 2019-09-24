import React from 'react';
import styled from 'styled-components/native';
import { Colors, FontSize } from './Variables';

// styled Text
const StyledStyledText = styled.Text`
  color: ${props => props.color || Colors.DarkColor};
  font-size: ${props => props.size || FontSize.normal};
  margin: ${props => props.margin || '0'};
  flex: ${props => props.flex || 'none'};
`;

export const StyledText = props => (
  <StyledStyledText
    color={props.color}
    size={props.size}
    margin={props.margin}
    flex={props.flex}
  >
    {props.children}
  </StyledStyledText>
);

// Headings
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
  color: ${props => props.color || 'black'};
  font-weight: ${props => props.weight || 'normal'};
`;
export const BlockText = props => (
  <StyledBlockText
    margin={props.margin}
    color={props.color}
    weight={props.weight}
  >
    {props.children}
  </StyledBlockText>
);
