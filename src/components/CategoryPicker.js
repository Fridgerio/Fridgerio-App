import React from 'react';
import { Text } from 'react-native';
import { Textbox } from './styled-components/Boxes';
import RNPickerSelect from 'react-native-picker-select';

const categories = [
  { value: '1', label: 'Alle', icon: 'food' },
  { value: '2', label: 'Obst&Gemüse', icon: 'food-apple' },
  { value: '3', label: 'Milchprodukte', icon: 'food-croissant' },
  { value: '4', label: 'Nudeln, Reis usw.', icon: 'food-fork-drink' },
  { value: '5', label: 'Getränke', icon: 'food-variant' },
];

// Returns picker with category names
export default function CategoryPicker() {
  return (
    <React.Fragment>
      <Textbox>
        <Text>Kategorie</Text>
      </Textbox>
      <RNPickerSelect
        onValueChange={value => console.warn(value)}
        items={categories}
        placeholder={{ label: 'Bitte wähle eine Kategorie', value: null }}
      />
    </React.Fragment>
  );
}
