import React from 'react';
import styled from 'styled-components/native';
import { Colors, FontSize } from './Variables';

// Date
const StyledExpiryDate = styled.Text`
  flex: ${props => props.flex || '1'};
  color: ${props => props.color || Colors.TertiaryColor};
  font-size: ${props => props.size || FontSize.normal};
`;
export const ExpiryDate = props => (
  <StyledExpiryDate flex={props.flex} color={props.color}>
    {props.title}
  </StyledExpiryDate>
);
