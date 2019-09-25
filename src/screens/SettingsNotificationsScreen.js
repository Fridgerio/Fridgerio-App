import React, { useContext, useEffect } from 'react';
import { ScrollView, Text, Picker } from 'react-native';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Context } from '../context/Context';
import { StyledText } from '../components/styled-components/Text.js';

function SettingsNotificationsScreen({ navigation }) {
  const { sendNotification, language } = useContext(Context);
  useEffect(() => {
    const title = language === 'DE' ? 'Benachrichtigungen' : 'Notifications';
    navigation.setParams({ title });
  }, [language]);

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

SettingsNotificationsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default SettingsNotificationsScreen;
