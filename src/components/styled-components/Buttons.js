import React from 'react';
import styled from 'styled-components';

// Save Button
const StyledSaveButton = styled.TouchableOpacity`
  background-color: #dbd962;
  padding: 3px 5px;
  width: 40%;
  border-radius: 5px;
`;
const StyledSaveButtonText = styled.Text`
  text-align: center;
  font-size: 18px;
`;
export const SaveButton = props => (
  <StyledSaveButton {...props}>
    <StyledSaveButtonText>{props.title}</StyledSaveButtonText>
  </StyledSaveButton>
);
