import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

function SettingsThemeScreen() {
  return (
    <ScrollView>
      <ThemeLinks>
        <ThemeLink>
          <ThemeLabel>Light</ThemeLabel>
        </ThemeLink>
        <ThemeLink>
          <ThemeLabel>Dark</ThemeLabel>
          <Ionicons name="md-checkmark" size={24} />
        </ThemeLink>
      </ThemeLinks>
    </ScrollView>
  );
}

export default SettingsThemeScreen;

const ThemeLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const ThemeLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ThemeLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;
