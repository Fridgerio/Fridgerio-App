import React from 'react';
import styled from 'styled-components';

const StyledTest = styled.Text`
  color: red;
`;
export const Test = props => <StyledTest {...props} />;
