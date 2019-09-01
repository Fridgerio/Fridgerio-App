import React from 'react';
import { ScrollView } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowLink } from '../components/styled-components/Links';

function SettingsLanguageScreen() {
  return (
    <ScrollView>
      <Textbox>
        <RowLink title="Deutsch" name="md-checkmark" />
        <RowLink title="English" />
      </Textbox>
    </ScrollView>
  );
}

SettingsLanguageScreen.navigationOptions = {
  title: 'Wähle eine Sprache',
};

export default SettingsLanguageScreen;
