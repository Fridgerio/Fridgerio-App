import React from 'react';
import { ScrollView } from 'react-native';

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
