import React from 'react';
import styled from 'styled-components/native';
import { SearchIcon } from './Icons';
import { Colors } from './Variables';

const normal = '16px';

// Input field
const StyledInput = styled.TextInput(props => `
flex: ${props.flex || '1'};
padding: ${props.padding || '0 10px'};
font-size: ${props.size || normal};
background-color: ${props.background || Colors.PrimaryUtilityColor};
border-radius: ${props.radius || '7px'};
`);

const InputLabel = styled.Text(props => `
  padding: ${props.padding || '0 10px'};
  font-size: ${props.size || normal}
  `);

// Text input and text area (multiline) container. When height property is not defined explicitly, the default height changes according to the TextInput multiline property of the child component
const StyledInputContainer = styled.View(props => `
flex: ${props.flex || '1'};
flex-direction: ${props.direction || 'column'};
height: ${props.height || props.multiline ? '120px' : '70px'};
background-color: ${props.background || 'transparent'};
border-radius: ${props.radius || '5px'};
  margin: ${props.margin || '0 0 10px 0'};
  padding: ${props.padding || '10px'};
`);

// Input component consists of container, text-label and input field. In order to see the label, a string value for the property inputLabel must be supplied
export const Input = props => {
  const {
    placeholder,
    defaultValue,
    onEndEditing,
    children,
    multiline,
    editable,
    textAlignVertical,
    inputLabel,
    flex,
    direction,
    background,
    size,
    height,
    margin,
    padding,
    radius,
    field,
  } = props;
  return (
    <StyledInputContainer
      multiline={multiline}
      direction={direction}
      height={height}
      background={background}
      radius={radius}
      margin={margin}
    >
      <InputLabel>{inputLabel}</InputLabel>
      <StyledInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        onEndEditing={onEndEditing}
        multiline={multiline}
        editable={editable}
        textAlignVertical={textAlignVertical}
        flex={flex}
        size={size}
        padding={padding}
        radius={radius}
        background={background}
        ref={field}
      >
        {children}
      </StyledInput>
    </StyledInputContainer>
  );
};

// Search bar container
const StyledSearch = styled.View(props => `
flex: ${props.flex || '1'};
flex-direction: ${props.direction || 'row'};
height: ${props.height || '35px'};
background-color: ${props.background || Colors.PrimaryUtilityColor};
border-radius: ${props.radius || '5px'};
  margin: ${props.margin || '0 0 10px 0'};
`);

// Search component consists of container, input field and search logo
export const Search = props => {
  const {
    placeholder,
    onEndEditing,
    children,
    flex,
    size,
    padding,
    direction,
    height,
    background,
    radius,
    margin,
  } = props;
  return (
    <StyledSearch
      direction={direction}
      height={height}
      background={background}
      radius={radius}
      margin={margin}
    >
      <StyledInput
        placeholder={placeholder}
        onEndEditing={onEndEditing}
        flex={flex}
        size={size}
        padding={padding}
      >
        {children}
      </StyledInput>
      <SearchIcon />
    </StyledSearch>
  );
};
