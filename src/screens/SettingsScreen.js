import React from 'react';
import { ScrollView, View, Text, Linking } from 'react-native';
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
        <Text
          onPress={() =>
            Linking.openURL('https://facebook.github.io/react-native/docs/linking')}
        >
          Hilfe / FAQ
        </Text>
        <Text>Impressum</Text>
        <Text>Datenschutzerklärung</Text>
      </View>
    </ScrollView>
  );
}

export default SettingsScreen;
