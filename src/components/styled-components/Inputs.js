import React from 'react';
import styled from 'styled-components/native';
import { SearchIcon } from './Icons';

// Input field
const StyledInput = styled.TextInput`
  flex: 1;
  padding: 0 10px;
  font-size: 16px;
`;

const InputLabel = styled.Text`
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

const StyledInputContainer = styled.View`
  flex: 1;
  flex-direction: column;
  height: ${props => (props.multiline ? 120 : 70)}px;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Input = props => {
  const {
    placeholder,
    onEndEditing,
    children,
    multiline,
    editable,
    textAlignVertical,
    inputLabel,
  } = props;
  return (
    <StyledInputContainer multiline={multiline}>
      <InputLabel>{inputLabel}</InputLabel>
      <StyledInput
        placeholder={placeholder}
        onEndEditing={onEndEditing}
        multiline={multiline}
        editable={editable}
        textAlignVertical={textAlignVertical}
      >
        {children}
      </StyledInput>
    </StyledInputContainer>
  );
};

export const Search = props => {
  const { placeholder, onEndEditing, children } = props;
  return (
    <StyledSearch>
      <StyledInput placeholder={placeholder} onEndEditing={onEndEditing}>
        {children}
      </StyledInput>
      <SearchIcon />
    </StyledSearch>
  );
};
