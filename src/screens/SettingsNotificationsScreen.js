import React, { useContext } from 'react';
import { ScrollView, Text, Picker } from 'react-native';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Context } from '../context/Context';
import { StyledText } from '../components/styled-components/Text.js';

function SettingsNotificationsScreen() {
  const { sendNotification } = useContext(Context);
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

SettingsNotificationsScreen.navigationOptions = {
  title: 'Notifications',
};

export default SettingsNotificationsScreen;
