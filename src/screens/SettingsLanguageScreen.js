import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowCheckLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';
import { Context } from '../context/Context';

function SettingsLanguageScreen() {
  const { setLanguage } = useContext(Context);
  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <RowCheckLink title="Deutsch" onPress={() => setLanguage('DE')} />
        <RowCheckLink title="English" onPress={() => setLanguage('EN')} />
      </Textbox>
    </ScrollView>
  );
}

function CustomHeader() {
  const { language } = useContext(Context);
  const title = language === 'DE' ? 'Wähle eine Sprache' : 'Choose a language';
  return <Text style={{ color: 'white' }}>{title}</Text>;
}

SettingsLanguageScreen.navigationOptions = {
  headerTitle: <CustomHeader />,
};

export default SettingsLanguageScreen;
