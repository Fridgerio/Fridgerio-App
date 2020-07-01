import React, { useContext, useEffect } from 'react';
import { ScrollView, Linking, Share } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';
import { Context } from '../context/Context';

function SettingsScreen({ navigation }) {
  const { language } = useContext(Context);
  useEffect(() => {
    const title = language === 'DE' ? 'Einstellungen' : 'Settings';
    navigation.setParams({ title });
  }, [language]);

  const onShare = () => {
    Share.share({
      message: 'Fridgerio - Prevent food waste',
    });
  };

  switch (language) {
    case 'DE':
      return (
        <ScrollView>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
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
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
            <RowLink
              title="Bewerte die App"
              onPress={() => Linking.openURL('https://fridgerio.de/bewerten')}
            />
            <RowLink title="Teile die App" onPress={onShare} />
          </Textbox>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
            <RowLink
              title="Hilfe / FAQ"
              onPress={() => Linking.openURL('https://fridgerio.de/hilfe')}
            />
          </Textbox>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
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
    default:
      return (
        <ScrollView>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
            <RowLink
              title="Languages"
              onPress={() => navigation.navigate('SettingsLanguageScreen')}
            />
            <RowLink
              title="Theme"
              onPress={() => navigation.navigate('SettingsThemeScreen')}
            />
            <RowLink
              title="Notifications"
              onPress={() => navigation.navigate('SettingsNotificationsScreen')}
            />
          </Textbox>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
            <RowLink title="Rate App" />
            <RowLink title="Share App" />
          </Textbox>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
            <RowLink
              title="Help / FAQ"
              onPress={() =>
                Linking.openURL(
                  'https://facebook.github.io/react-native/docs/linking'
                )
              }
            />
          </Textbox>
          <Textbox bottomLine={Colors.PrimaryUtilityColor}>
            <RowLink
              title="Legal Notice"
              onPress={() => navigation.navigate('LegalNoticeScreen')}
            />
            <RowLink
              title="Privacy Policy"
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            />
          </Textbox>
        </ScrollView>
      );
  }
}

SettingsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default SettingsScreen;
