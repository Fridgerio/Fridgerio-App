import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './Variables';

const StyledRowLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;
const StyledRowLinkLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
  font-family: 'FridgerioPrimaryFont';
`;
export const RowLink = props => {
  const { name, title, onPress } = props;
  return (
    <StyledRowLink onPress={onPress}>
      <StyledRowLinkLabel>{title}</StyledRowLinkLabel>
      <Ionicons name={name || 'ios-arrow-forward'} size={24} />
    </StyledRowLink>
  );
};

export const RowCheckLink = props => {
  const { color, name, title, onPress } = props;
  return (
    <StyledRowLink onPress={onPress}>
      <StyledRowLinkLabel>{title}</StyledRowLinkLabel>
      {name ? <Ionicons color={Colors.PrimaryColor} name={name} size={24} /> : <Text />}
    </StyledRowLink>
  );
};

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

export const Row = props => {
  return (
    <StyledRow>
      {props.children}
    </StyledRow>
  );
};