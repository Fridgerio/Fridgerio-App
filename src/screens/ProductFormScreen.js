import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Picker,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Textbox } from '../components/styled-components/Boxes';

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
    <Textbox>
      <Text>Kategorie</Text>
      <Picker
        prompt="Kategorie"
        selectedValue="2"
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
    </Textbox>
  );
}

function AddLabels() {
  return (
    <Textbox>
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
    </Textbox>
  );
}

function CreateNumberPicker(max) {
  const numberPicker = [];
  for (let i = 1; i <= max; i++) {
    numberPicker.push(<Picker.Item label={`${i}`} value={i} key={i} />);
  }
  return numberPicker;
}

function ProductFormScreen() {
  return (
    <ScrollView>
      <Textbox>
        <Text>Name</Text>
        <TextInput placeholder="z.B. Apfel" editable />
      </Textbox>

      <MaterialCommunityIcons
        name="food-apple"
        style={{
          color: '#7da10d',
          fontSize: 150,
          width: 150,
          height: 150,
          paddingRight: 15,
          backgroundColor: '#1b4e55',
          alignSelf: 'flex-end',
        }}
      />

      <CategoryPicker />

      <Textbox>
        <Text>Menge</Text>
        <Picker prompt="Menge" selectedValue={1}>
          {CreateNumberPicker(5)}
        </Picker>
      </Textbox>

      <Textbox>
        <Text>Mindesthaltbarkeitsdatum</Text>
        <BBDatePicker />
      </Textbox>

      <Textbox>
        <Text>Benachrichtigung</Text>
        <Picker prompt="Benachrichtigung" selectedValue={1}>
          {CreateNumberPicker(14)}
        </Picker>
      </Textbox>

      <AddLabels />

      <Textbox>
        <Text>Note</Text>
        <TextInput
          placeholder="Add custom note"
          multiline
          editable={false}
          textAlignVertical="top"
        />
      </Textbox>

      <FlatList
        data={[
          { key: 'x', name: 'Abbrechen' },
          { key: 'v', name: 'Speichern' },
        ]}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <PrimaryButton title={item.name} />}
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
