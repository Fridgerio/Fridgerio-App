import React from 'react';
import styled from 'styled-components/native';
import { SearchIcon } from './Icons';

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
export const Input = props => (
  <StyledInput
    placeholder={props.placeholder}
    onEndEditing={props.onEndEditing}
  />
);
export const Search = props => (
  <StyledSearch>
    <Input placeholder={props.placeholder} onEndEditing={props.onEndEditing} />
    <SearchIcon />
  </StyledSearch>
);
