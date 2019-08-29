import React from 'react';
import { ScrollView, Linking } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

function SettingsScreen({ navigation }) {
  return (
    <ScrollView>
      <GeneralSettingsLinks>
        <LanguageLink>
          <LanguageLabel>Sprache</LanguageLabel>
          <Ionicons
            name="ios-arrow-forward"
            size={24}
            onPress={() => navigation.navigate('SettingsLanguageScreen')}
          />
        </LanguageLink>
        <ThemeLink>
          <ThemeLabel>Design</ThemeLabel>
          <Ionicons
            name="ios-arrow-forward"
            size={24}
            onPress={() => navigation.navigate('SettingsThemeScreen')}
          />
        </ThemeLink>
        <NotificationsLink>
          <NotificationsLabel>Benachrichtigungen</NotificationsLabel>
          <Ionicons
            name="ios-arrow-forward"
            size={24}
            onPress={() => navigation.navigate('SettingsNotificationsScreen')}
          />
        </NotificationsLink>
      </GeneralSettingsLinks>
      <SocialLinks>
        <RateLink>
          <RateLabel>Bewerte die App</RateLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </RateLink>
        <ShareLink>
          <ShareLabel>Teile die App</ShareLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </ShareLink>
      </SocialLinks>
      <HelpLinks>
        <HelpLink>
          <HelpLabel
            onPress={() =>
              Linking.openURL('https://facebook.github.io/react-native/docs/linking')}
          >
            Hilfe / FAQ
          </HelpLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </HelpLink>
      </HelpLinks>
      <LegalLinks>
        <LegalNoticeLink>
          <LegalNoticeLabel>Impressum</LegalNoticeLabel>
          <Ionicons
            name="ios-arrow-forward"
            size={24}
            onPress={() => navigation.navigate('LegalNoticeScreen')}
          />
        </LegalNoticeLink>
        <PrivacyPolicyLink>
          <PrivacyPolicyLabel>Datenschutzerklärung</PrivacyPolicyLabel>
          <Ionicons
            name="ios-arrow-forward"
            size={24}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
          />
        </PrivacyPolicyLink>
      </LegalLinks>
    </ScrollView>
  );
}

export default SettingsScreen;

SettingsScreen.navigationOptions = {
  title: 'Einstellungen',
};

const GeneralSettingsLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const LanguageLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LanguageLabel = styled.Text`
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

const NotificationsLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NotificationsLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const SocialLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const RateLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RateLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const ShareLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ShareLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const HelpLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const HelpLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HelpLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const LegalLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const LegalNoticeLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LegalNoticeLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const PrivacyPolicyLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PrivacyPolicyLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;
