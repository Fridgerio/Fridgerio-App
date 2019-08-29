import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

function SettingsLanguageScreen() {
  return (
    <ScrollView>
      <LanguageLinks>
        <LanguageLink>
          <LanguageLabel>Deutsch</LanguageLabel>
          <Ionicons name="md-checkmark" size={24} />
        </LanguageLink>
        <LanguageLink>
          <LanguageLabel>English</LanguageLabel>
        </LanguageLink>
      </LanguageLinks>
    </ScrollView>
  );
}

export default SettingsLanguageScreen;

// LanguageScreen.navigationOptions = {
//  title: 'Sprache wählen',
// };

const LanguageLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const LanguageLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LanguageLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;
