import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowCheckLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';
import { Context } from '../context/Context';

function SettingsThemeScreen() {
  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <RowCheckLink title="Light" name="md-checkmark" />
        <RowCheckLink title="Dark" />
      </Textbox>
    </ScrollView>
  );
}

function CustomHeader() {
  const { language } = useContext(Context);
  const title = language === 'DE' ? 'Wähle ein Theme' : 'Choose a theme';
  return <Text style={{ color: 'white' }}>{title}</Text>;
}

SettingsThemeScreen.navigationOptions = {
  headerTitle: <CustomHeader />,
};

export default SettingsThemeScreen;
