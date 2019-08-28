import React from 'react';
import { ScrollView, Linking } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import styled from 'styled-components';

function SettingsScreen() {
  return (
    <ScrollView>
      <SettingsView>
        <LanguageLink>Sprache</LanguageLink>
        <ThemeLink>
          <ThemeLabel>Design</ThemeLabel>
          <ToggleButton>
            <ToggleSwitch isOn onColor="hotpink" />
          </ToggleButton>
        </ThemeLink>
        <NotificationsLink>Benachrichtigungen</NotificationsLink>
      </SettingsView>
      <SocialLinks>
        <RateLink>Bewerte die App</RateLink>
        <ShareLink>Teile die App</ShareLink>
      </SocialLinks>
      <HelpView>
        <HelpLink
          onPress={() =>
            Linking.openURL('https://facebook.github.io/react-native/docs/linking')}
        >
          Hilfe / FAQ
        </HelpLink>
      </HelpView>
      <LegalLinks>
        <LegalNoticeLink>Impressum</LegalNoticeLink>
        <PrivacyPolicyLink>Datenschutzerklärung</PrivacyPolicyLink>
      </LegalLinks>
    </ScrollView>
  );
}

export default SettingsScreen;

SettingsScreen.navigationOptions = {
  title: 'Einstellungen',
};

const SettingsView = styled.View`
  padding: 5px 10px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const LanguageLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const ThemeLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ThemeLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const ToggleButton = styled.View`
  padding: 4px 0;
  text-align: right;
`;

const NotificationsLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const SocialLinks = styled.View`
  padding: 5px 10px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const RateLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const ShareLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const HelpView = styled.View`
  padding: 5px 10px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const HelpLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const LegalLinks = styled.View`
  padding: 5px 10px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const LegalNoticeLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const PrivacyPolicyLink = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;
