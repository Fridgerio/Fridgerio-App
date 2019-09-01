import React from 'react';
import { ScrollView } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowLink } from '../components/styled-components/Links';

function SettingsThemeScreen() {
  return (
    <ScrollView>
      <Textbox>
        <RowLink title="Light" name="md-checkmark" />
        <RowLink title="Dark" />
      </Textbox>
    </ScrollView>
  );
}

SettingsThemeScreen.navigationOptions = {
  title: 'Wähle ein Theme',
};

export default SettingsThemeScreen;
