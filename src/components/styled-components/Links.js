import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const StyledRowLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;
const StyledRowLinkLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
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
  const { name, title, onPress } = props;
  return (
    <StyledRowLink onPress={onPress}>
      <StyledRowLinkLabel>{title}</StyledRowLinkLabel>
      {name ? <Ionicons name={name} size={24} /> : <Text />}
    </StyledRowLink>
  );
};

export const Row = props => {
  return (
    <StyledRowLink>
      {props.children}
    </StyledRowLink>
  );
};