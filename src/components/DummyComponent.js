import React from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';

function ComponentIOS() {
  return <Text>You are using iOS 👍</Text>;
}

function ComponentAndroid() {
  return <Text>You are using Android 👎</Text>;
}

const Component = Platform.select({
  // ios: () => require('ComponentIOS')
  ios: () => ComponentIOS,
  android: () => ComponentAndroid,
})();

export default function DummyComponent() {
  return (
    <View>
      <Text style={styles.text}>
        A few hours of trial & error can save you several minutes of looking at
        the README.
      </Text>
      <Component />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingVertical: 30,
    color: Platform.OS === 'ios' ? 'darkorange' : 'deeppink',
    ...Platform.select({
      ios: {
        textTransform: 'uppercase',
      },
      android: {
        textTransform: 'capitalize',
      },
    }),
  },
});
