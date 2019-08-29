import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from NotificationsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

NotificationsScreen.navigationOptions = {
  title: 'NotificationsScreen',
};

export default NotificationsScreen;
