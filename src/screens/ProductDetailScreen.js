import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function ProductDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from ProductDetailScreen</Text>
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

ProductDetailScreen.navigationOptions = {
  title: 'ProductDetailScreen',
};

export default ProductDetailScreen;
