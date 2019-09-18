import React, { useState } from 'react';
import { StyledText } from './styled-components/Text.js';

export default function HelpText(props) {
  const { showHelp, setShowHelp } = props;
  setTimeout(() => {
    setShowHelp(true);
  }, 6000);
  return showHelp ? (
    <StyledText color="white" margin="0 auto">
      Barcode mittig positionieren
    </StyledText>
  ) : (
    <StyledText />
  );
}
