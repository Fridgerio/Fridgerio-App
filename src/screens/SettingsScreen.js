import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

function SettingsScreen() {
  return (
    <ScrollView>
      <View>
        <ToggleSwitch isOn label="Sprache" />
        <ToggleSwitch isOn label="Design" />
        <Text>Benachrichtigungen</Text>
      </View>
      <View>
        <Text>Bewerte die App</Text>
        <Text>Teile die App</Text>
      </View>
      <View>
        <Text>Hilfe / FAQ</Text>
        <Text>Impressum</Text>
        <Text>Datenschutzerklärung</Text>
      </View>
    </ScrollView>
  );
}

export default SettingsScreen;
