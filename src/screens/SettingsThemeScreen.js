import React, { useContext, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowCheckLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';
import { Context } from '../context/Context';

function SettingsThemeScreen({ navigation }) {
  const { language } = useContext(Context);
  useEffect(() => {
    const title = language === 'DE' ? 'Wähle ein Theme' : 'Choose a theme';
    navigation.setParams({ title });
  }, [language]);

  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <RowCheckLink title="Light" name="md-checkmark" />
        <RowCheckLink title="Dark" />
      </Textbox>
    </ScrollView>
  );
}

SettingsThemeScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default SettingsThemeScreen;
