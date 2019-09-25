import React from 'react';
import styled from 'styled-components/native';
import { SearchIcon } from './Icons';
import { Colors, FontSize } from './Variables';

// Input field
const StyledInput = styled.TextInput(
  props => `
  font-family: 'FridgerioPrimaryFont';
  flex: ${props.flex || '1'};
  padding: ${props.padding || '0'};
  margin-left: ${props.marginLeft || '0'};
  font-size: ${props.size || FontSize.small};
  background-color: ${props.background || Colors.LightColor};
  border-color: ${props.borderColor || Colors.TertiaryColor};
  border-style: ${props.borderStyle || 'solid'};
  border-width: ${props.borderWidth || '1px'};
  border-radius: ${props.radius || '5px'};
`
);

const InputLabel = styled.Text(
  props => `
  padding: ${props.padding || '0'};
  font-family: 'FridgerioPrimaryFont';
  font-size: ${props.size || FontSize.normal}
  margin-bottom: 7px
`
);

// Text input and text area (multiline) container. When height property is not defined explicitly, the default height changes according to the TextInput multiline property of the child component
const StyledInputContainer = styled.View(
  props => `
  flex: ${props.flex || '1'};
  flex-direction: ${props.direction || 'column'};
  height: ${props.height || props.multiline ? '120px' : '70px'};
  background-color: ${props.background || 'transparent'};
  border-radius: ${props.radius || '5px'};
  margin: ${props.margin || '0 0 10px 0'};
  padding: ${props.padding || '0px'};
`
);

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
    field,
    flex,
    direction,
    background,
    size,
    height,
    margin,
    padding,
    radius,
    borderColor,
    borderStyle,
    borderWidth,
    onChangeText,
    marginLeft,
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
        ref={field}
        textAlignVertical={textAlignVertical}
        flex={flex}
        size={size}
        padding={padding}
        radius={radius}
        background={background}
        borderColor={borderColor}
        borderStyle={borderStyle}
        borderWidth={borderWidth}
        onChangeText={onChangeText}
        marginLeft={marginLeft}
      >
        {children}
      </StyledInput>
    </StyledInputContainer>
  );
};

// Search bar container
const StyledSearch = styled.View(
  props => `
  flex: ${props.flex || '1'};
  flex-direction: ${props.direction || 'row'};
  height: ${props.height || '35px'};
  background-color: ${props.background || Colors.PrimaryUtilityColor};
  border-radius: ${props.radius || '5px'};
  margin: ${props.margin || '10px'};
  padding: 0 0 0 10px
`
);

// Search component consists of container, input field and search logo
export const Search = props => {
  const {
    placeholder,
    onEndEditing,
    borderWidth,
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
        borderWidth={borderWidth}
      >
        {children}
      </StyledInput>
      <SearchIcon />
    </StyledSearch>
  );
};
