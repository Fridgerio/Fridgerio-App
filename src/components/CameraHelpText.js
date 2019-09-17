import React, { useState } from 'react';
import { StyledText } from './styled-components/Text.js';

export default function HelpText() {
  const [help, setHelp] = useState(false);
  setTimeout(() => {
    setHelp(true);
  }, 6000);
  return help ? (
    <StyledText color="white" margin="0 auto">
      Position a product barcode in the frame
    </StyledText>
  ) : (
    <StyledText />
  );
}
