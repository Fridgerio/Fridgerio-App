import React, { useContext } from 'react';
import { ScrollView, Text, Picker } from 'react-native';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Context } from '../context/Context';

function SettingsNotificationsScreen() {
  const { sendNotification } = useContext(Context);
  return (
    <ScrollView>
      <PrimaryButton
        title={'Show notification'}
        color={'orange'}
        onPress={() => sendNotification()}
      />
    </ScrollView>
  );
}

SettingsNotificationsScreen.navigationOptions = {
  title: 'Benachrichtigungserinnerungen',
};

export default SettingsNotificationsScreen;
