import React from 'react';
import styled from 'styled-components/native';
import { Colors } from './Variables';

// Headings
// h2
const StyledH2 = styled.Text`
  color: ${Colors.TertiaryColor};
  font-size: 18px;
  margin: 25px 0 10px 0;
`;
export const H2 = props => <StyledH2>{props.children}</StyledH2>;

// Text align
// Block
const StyledBlockText = styled.Text`
  text-align: justify;
`;
export const BlockText = props => (
  <StyledBlockText>{props.children}</StyledBlockText>
);
