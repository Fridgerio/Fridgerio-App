import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ProductFormScreen() {
  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput placeholder="z.B. Tomate" editable />

      <Text>Note</Text>
      <TextInput
        placeholder="Add custom note"
        multiline
        editable={false}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
});

ProductFormScreen.navigationOptions = {
  title: 'Add Product',
  headerRight: (
    <Text>
      <Ionicons name="md-trash" size={22} color="white" />
    </Text>
  ),
};

export default ProductFormScreen;
