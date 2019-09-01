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
export const RowLink = props => (
  <StyledRowLink {...props}>
    <StyledRowLinkLabel>{props.title}</StyledRowLinkLabel>
    <Ionicons name={props.name || 'ios-arrow-forward'} size={24} />
  </StyledRowLink>
);

export const RowCheckLink = props => (
  <StyledRowLink {...props}>
    <StyledRowLinkLabel>{props.title}</StyledRowLinkLabel>
    {props.name ? <Ionicons name={props.name} size={24} /> : <Text />}
  </StyledRowLink>
);