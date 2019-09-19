import React from 'react';
import styled from 'styled-components/native';
import { Colors } from './Variables';

// Primary Button
const StyledPrimaryButton = styled.TouchableOpacity`
  background-color: ${props => props.color || Colors.SecondaryColor};
  flex: ${props => props.flex || 'none'};
  padding: 3px 5px;
  margin: 0 5px;
  width: 47%;
  border-radius: 5px;
`;
const StyledPrimaryButtonText = styled.Text`
  text-align: center;
  font-size: ${props => props.size || '18px'};
`;
export const PrimaryButton = props => {
  const { color, flex, title, size, style, onPress } = props;
  return (
    <StyledPrimaryButton color={color} flex={flex} onPress={onPress} style={style}>
      <StyledPrimaryButtonText size={size}>{title}</StyledPrimaryButtonText>
    </StyledPrimaryButton>
  );
};
