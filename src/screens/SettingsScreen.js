import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowLink } from '../components/styled-components/Links';

function SettingsScreen({ navigation }) {
  return (
    <ScrollView>
      <Textbox>
        <RowLink
          title="Sprachen"
          onPress={() => navigation.navigate('SettingsLanguageScreen')}
        />
        <RowLink
          title="Design"
          onPress={() => navigation.navigate('SettingsThemeScreen')}
        />
        <RowLink
          title="Benachrichtigungen"
          onPress={() => navigation.navigate('SettingsNotificationsScreen')}
        />
      </Textbox>
      <Textbox>
        <RowLink title="Bewerte die App" />
        <RowLink title="Teile die App" />
      </Textbox>
      <Textbox>
        <RowLink
          title="Hilfe / FAQ"
          onPress={() =>
            Linking.openURL(
              'https://facebook.github.io/react-native/docs/linking'
            )
          }
        />
      </Textbox>
      <Textbox>
        <RowLink
          title="Impressum"
          onPress={() => navigation.navigate('LegalNoticeScreen')}
        />
        <RowLink
          title="Datenschutzerklärung"
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}
        />
      </Textbox>
    </ScrollView>
  );
}

export default SettingsScreen;

SettingsScreen.navigationOptions = {
  title: 'Einstellungen',
};
