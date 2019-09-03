import React from 'react';
import styled from 'styled-components/native';

// Input field
const StyledInput = styled.TextInput`
  flex: 1;
  padding: 0 10px;
  font-size: 16px;
`;
export const Input = props => <StyledInput {...props} />;
