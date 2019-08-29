import React from 'react';
import { ScrollView, Linking } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

function SettingsScreen({ navigation }) {
  return (
    <ScrollView>
      <GeneralSettingsLinks>
        <LanguageLink
          onPress={() => navigation.navigate('SettingsLanguageScreen')}
        >
          <LanguageLabel>Sprache</LanguageLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </LanguageLink>
        <ThemeLink onPress={() => navigation.navigate('SettingsThemeScreen')}>
          <ThemeLabel>Design</ThemeLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </ThemeLink>
        <NotificationsLink
          onPress={() => navigation.navigate('SettingsNotificationsScreen')}
        >
          <NotificationsLabel>Benachrichtigungen</NotificationsLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
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
        <HelpLink
          onPress={() =>
            Linking.openURL('https://facebook.github.io/react-native/docs/linking')}
        >
          <HelpLabel>Hilfe / FAQ</HelpLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </HelpLink>
      </HelpLinks>
      <LegalLinks>
        <LegalNoticeLink
          onPress={() => navigation.navigate('LegalNoticeScreen')}
        >
          <LegalNoticeLabel>Impressum</LegalNoticeLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
        </LegalNoticeLink>
        <PrivacyPolicyLink
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}
        >
          <PrivacyPolicyLabel>Datenschutzerklärung</PrivacyPolicyLabel>
          <Ionicons name="ios-arrow-forward" size={24} />
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

const LanguageLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const LanguageLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const ThemeLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const ThemeLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const NotificationsLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
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

const RateLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const RateLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const ShareLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
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

const HelpLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
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

const LegalNoticeLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const LegalNoticeLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const PrivacyPolicyLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const PrivacyPolicyLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;
