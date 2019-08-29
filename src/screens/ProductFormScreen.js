import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function ProductFormScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from ProductFormScreen</Text>
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

ProductFormScreen.navigationOptions = {
  title: 'Add Product',
};

export default ProductFormScreen;
