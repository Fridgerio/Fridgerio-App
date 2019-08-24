import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function ListScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

ListScreen.navigationOptions = {
  title: 'Your Products',
};

export default ListScreen;
