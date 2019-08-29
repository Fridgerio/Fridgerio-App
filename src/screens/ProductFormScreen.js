import React from 'react';
import { ScrollView, Text, TextInput, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ProductFormScreen() {
  return (
    <ScrollView>
      <Text>Name</Text>
      <TextInput placeholder="z.B. Tomate" editable />

      <Text>Kategorie</Text>
      <Picker prompt="Kategorie" selectedValue="None">
        <Picker.Item label="Bitte wähle eine Kategorie" value="None" />
        <Picker.Item label="Obst&Gemüse" value="TBD" />
        <Picker.Item label="Milchprodukte" value="TBD" />
        <Picker.Item label="Nudeln, Reis usw." value="TBD" />
        <Picker.Item label="Getränke" value="TBD" />
      </Picker>

      <Text>Menge</Text>
      <Picker prompt="Menge" selectedValue={1}>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
      </Picker>

      <Text>Benachrichtigung</Text>
      <Picker prompt="Benachrichtigung" selectedValue={1}>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
        <Picker.Item label="6" value={6} />
        <Picker.Item label="7" value={7} />
        <Picker.Item label="8" value={8} />
        <Picker.Item label="9" value={9} />
        <Picker.Item label="10" value={10} />
        <Picker.Item label="11" value={11} />
        <Picker.Item label="12" value={12} />
        <Picker.Item label="13" value={13} />
        <Picker.Item label="14" value={14} />
      </Picker>

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
