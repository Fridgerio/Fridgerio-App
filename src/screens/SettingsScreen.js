import React from 'react';
import { ScrollView, View, Text } from 'react-native';

function SettingsScreen() {
  return (
    <ScrollView>
      <View>
        <Text>Sprache</Text>
        <Text>Design</Text>
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
