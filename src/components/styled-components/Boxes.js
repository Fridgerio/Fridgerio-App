import React from 'react';
import styled from 'styled-components/native';

// Textbox
const StyledTextbox = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;
export const Textbox = props => <StyledTextbox {...props} />;
