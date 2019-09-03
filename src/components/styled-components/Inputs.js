import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

// Input field
const StyledInput = styled.TextInput`
  flex: 1;
  padding: 0 10px;
  font-size: 16px;
`;

// Search bar
const StyledSearch = styled.View`
  flex: 1;
  flex-direction: row;
  height: 35px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin-bottom: 10px;
`;
export const Input = props => <StyledInput {...props} />;
export const Search = props => (
  <StyledSearch {...props}>
    <StyledInput {...props} />
    <Ionicons name="ios-search" style={styles.searchIcon} />
  </StyledSearch>
);

const styles = StyleSheet.create({
  searchIcon: {
    fontSize: 28,
    color: '#1b4e55',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginTop: 3,
  },
});
