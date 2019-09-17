import React, { useState } from 'react';
import { Text } from 'react-native';

export default function HelpText() {
  const [help, setHelp] = useState(false);
  setTimeout(() => {
    setHelp(true);
  }, 6000);
  return help ? <Text>Help</Text> : <Text />;
}
