import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Context } from '../context/Context';
import { StyledText } from '../components/styled-components/Text.js';

function SettingsNotificationsScreen({ navigation }) {
  const { sendNotification, language } = useContext(Context);
  useEffect(() => {
    const title = language === 'DE' ? 'Benachrichtigungen' : 'Notifications';
    navigation.setParams({ title });
  }, [language]);

  switch (language) {
    case 'DE':
      return (
        <ScrollView>
          <StyledText>Passe Benachrichtigungszeiträume an:</StyledText>
          <PrimaryButton
            title={'Sende Notification'}
            onPress={() => sendNotification()}
          />
        </ScrollView>
      );
    default:
      return (
        <ScrollView>
          <StyledText>Set default notifications:</StyledText>
          <PrimaryButton
            title={'Send notification'}
            onPress={() => sendNotification()}
          />
        </ScrollView>
      );
  }
}

SettingsNotificationsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default SettingsNotificationsScreen;
