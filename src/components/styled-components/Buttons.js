import React from 'react';
import styled from 'styled-components';

// Default Button
const StyledDefaultButton = styled.TouchableOpacity`
  background-color: #dbd962;
  padding: 3px 5px;
  margin: 3px 0;
  width: 40%;
  border-radius: 5px;
`;
const StyledDefaultButtonText = styled.Text`
  text-align: center;
  font-size: 18px;
`;
export const DefaultButton = props => (
  <StyledDefaultButton {...props}>
    <StyledDefaultButtonText>{props.title}</StyledDefaultButtonText>
  </StyledDefaultButton>
);

// Save Button
const StyledSaveButton = styled(DefaultButton)`
  background-color: #3cb371;
`;
const StyledSaveButtonText = styled(DefaultButton)``;
export const SaveButton = props => (
  <StyledSaveButton {...props}>
    <StyledSaveButtonText>{props.title}</StyledSaveButtonText>
  </StyledSaveButton>
);
