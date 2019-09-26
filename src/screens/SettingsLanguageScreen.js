import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowCheckLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';
import { Context } from '../context/Context';

function SettingsLanguageScreen({ navigation }) {
  const { language, setLanguage } = useContext(Context);
  useEffect(() => {
    const title =
      language === 'DE' ? 'Wähle eine Sprache' : 'Choose a language';
    navigation.setParams({ title });
  }, [language]);
  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <RowCheckLink
          title="Deutsch"
          name={language === 'DE' ? 'md-checkmark' : null}
          onPress={() => setLanguage('DE')}
        />
        <RowCheckLink
          title="English"
          name={language === 'EN' ? 'md-checkmark' : null}
          onPress={() => setLanguage('EN')}
        />
      </Textbox>
    </ScrollView>
  );
}

SettingsLanguageScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default SettingsLanguageScreen;
