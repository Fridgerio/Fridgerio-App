import React, { useState } from 'react';
import { StyledText } from './styled-components/Text.js';

export default function HelpText(props) {
  const { title } = props;
  return (
    <StyledText color="white" margin="230px auto -70px auto">
      {title}
    </StyledText>
  );
}
