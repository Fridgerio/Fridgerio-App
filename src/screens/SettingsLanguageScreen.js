import React from 'react';
import { ScrollView } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowCheckLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';

function SettingsLanguageScreen() {
  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <RowCheckLink title="Deutsch" name="md-checkmark" />
        <RowCheckLink title="English" />
      </Textbox>
    </ScrollView>
  );
}

SettingsLanguageScreen.navigationOptions = {
  title: 'Wähle eine Sprache',
};

export default SettingsLanguageScreen;
