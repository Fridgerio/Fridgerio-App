import React from 'react';
import styled from 'styled-components/native';

// Textbox
const StyledTextbox = styled.View`
  padding: 5px 15px;
  margin: ${props => (props.card ? '10px' : '5px 0')};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.bottomLine || 'transparent'};
  background-color: ${props => (props.card ? '#f0f0f0' : 'transparent')};
  border-radius: ${props => (props.card ? 10 : 0)};
`;
export const Textbox = props => {
  const { card, bottomLine, children } = props;
  return (
    <StyledTextbox card={card} bottomLine={bottomLine}>
      {children}
    </StyledTextbox>
  );
};

// Elementbox
const StyledElementbox = styled.View`
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'space-around'};
  margin: ${props => props.margin || '15px 0'};
  padding: ${props => props.padding || '15px'};
`;
export const Elementbox = props => (
  <StyledElementbox
    direction={props.direction}
    alignItems={props.alignItems}
    justifyContent={props.justifyContent}
    margin={props.margin}
    padding={props.padding}
  >
    {props.children}
  </StyledElementbox>
);
