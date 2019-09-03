import React from 'react';
import styled from 'styled-components/native';

// Textbox
const StyledTextbox = styled.View`
  padding: 5px 15px;
  margin: ${props => (props.card ? '10px' : '5px 0')};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.bottomLine || 'transparent'};
  background-color: ${props => (props.card ? '#f0f0f0' : 'transparent')};
  border-radius: ${props => (props.card ? 10 : 0)};
`;
export const Textbox = props => <StyledTextbox {...props} />;

// Textbox
const StyledElementbox = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 30px;
`;
export const Elementbox = props => <StyledElementbox {...props} />;
