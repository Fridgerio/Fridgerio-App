import React from 'react';
import { ScrollView, Text, TextInput, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ProductFormScreen() {
  return (
    <ScrollView>
      <Text>Name</Text>
      <TextInput placeholder="z.B. Tomate" editable />

      <Text>Note</Text>
      <TextInput
        placeholder="Add custom note"
        multiline
        editable={false}
        textAlignVertical="top"
      />
    </ScrollView>
  );
}

ProductFormScreen.navigationOptions = {
  title: 'Add Product',
  headerRight: (
    <Text>
      <Ionicons name="md-trash" size={22} color="white" />
    </Text>
  ),
};

export default ProductFormScreen;
