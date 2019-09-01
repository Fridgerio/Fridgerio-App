import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
  FlatList,
  Picker,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Alle', icon: 'food' },
  { id: '2', name: 'Obst&Gemüse', icon: 'food-apple' },
  { id: '3', name: 'Milchprodukte', icon: 'food-croissant' },
  { id: '4', name: 'Nudeln, Reis usw.', icon: 'food-fork-drink' },
  { id: '5', name: 'Getränke', icon: 'food-variant' },
];

const labels = [
  { id: '1', color: 'red', chosen: false },
  { id: '2', color: 'hotpink', chosen: true },
  { id: '3', color: 'orange', chosen: false },
  { id: '4', color: 'yellow', chosen: false },
  { id: '5', color: 'green', chosen: false },
  { id: '6', color: 'blue', chosen: false },
];

function BBDatePickerIOS() {
  return (
    <DatePickerIOS
      initialDate={new Date()}
      minimumDate={new Date()}
      mode="date"
    />
  );
}

function BBDatePickerAndroid() {
  // DatePickerAndroid.open({
  //   date: new Date(),
  // });
  return <Text>Not available yet</Text>;
}

const BBDatePicker = Platform.select({
  ios: () => BBDatePickerIOS,
  android: () => BBDatePickerAndroid,
})();

function CategoryPicker() {
  return (
    <React.Fragment>
      <Text>Kategorie</Text>
      <Picker
        prompt="Kategorie"
        selectedValue="0"
        onValueChange={itemValue =>
          console.warn(`Category ${itemValue} selected`)}
      >
        <Picker.Item label="Bitte wähle eine Kategorie" value="0" />
        {categories.map(category => (
          <Picker.Item
            label={category.name}
            value={category.id}
            key={category.id}
          />
        ))}
      </Picker>
    </React.Fragment>
  );
}

function AddLabels() {
  return (
    <React.Fragment>
      <Text>Füge ein Label hinzu</Text>
      <FlatList
        horizontal
        data={labels}
        keyExtractor={label => label.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.warn('clicked')}>
            <Ionicons
              name={item.chosen ? 'md-checkbox' : 'md-square'}
              style={{ color: item.color, fontSize: 32, paddingRight: 10 }}
            />
          </TouchableOpacity>
        )}
      />
    </React.Fragment>
  );
}

function ProductFormScreen() {
  return (
    <ScrollView>
      <Text>Name</Text>
      <TextInput placeholder="z.B. Tomate" editable />

      <CategoryPicker />

      <Image
        style={{ width: 150, height: 150 }}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />

      <Text>Menge</Text>
      <Picker prompt="Menge" selectedValue={1}>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
      </Picker>

      <Text>Mindesthaltbarkeitsdatum</Text>
      <BBDatePicker />

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

      <AddLabels />

      <Text>Note</Text>
      <TextInput
        placeholder="Add custom note"
        multiline
        editable={false}
        textAlignVertical="top"
      />

      <Button title="Speichern" />
      <Button title="Abbrechen" />
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
