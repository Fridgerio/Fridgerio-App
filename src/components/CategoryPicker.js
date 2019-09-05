import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Picker,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
} from 'react-native';

import { Input } from '../components/styled-components/Inputs';

const categories = [
  { id: '1', name: 'Alle', icon: 'food' },
  { id: '2', name: 'Obst&Gemüse', icon: 'food-apple' },
  { id: '3', name: 'Milchprodukte', icon: 'food-croissant' },
  { id: '4', name: 'Nudeln, Reis usw.', icon: 'food-fork-drink' },
  { id: '5', name: 'Getränke', icon: 'food-variant' },
];

// Returns picker with category names
export default function CategoryPicker() {
  return (
    <React.Fragment>
      <Input
        inputLabel="Kategorie"
        placeholder="Bitte wähle eine Kategorie"
        editable={false}
        defaultValue={categories[1].name}
      />
      <Picker
        prompt="Kategorie"
        selectedValue={categories[1].id}
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
