import React from 'react';
import { Text } from 'react-native';
import { Textbox } from './styled-components/Boxes';
import RNPickerSelect from 'react-native-picker-select';

const categories = [
  { value: '1', label: 'Alle', icon: 'food', key: 'Alle' },
  { value: '2', label: 'Obst&Gemüse', icon: 'food-apple', key: 'Obst&Gemüse' },
  {
    value: '3',
    label: 'Milchprodukte',
    icon: 'food-croissant',
    key: 'Milchprodukte',
  },
  {
    value: '4',
    label: 'Nudeln, Reis usw.',
    icon: 'food-fork-drink',
    key: 'Nudeln, Reis usw.',
  },
  { value: '5', label: 'Getränke', icon: 'food-variant', key: 'Getränke' },
];

// Returns picker with category names
export default function CategoryPicker(props) {
  return (
    <React.Fragment>
      <Textbox>
        <Text>Kategorie</Text>
      </Textbox>
      <RNPickerSelect
        onValueChange={value => props.onValueChange(value)}
        items={categories}
        itemKey={props ? props.category : null}
        placeholder={{ label: 'Bitte wähle eine Kategorie', value: null }}
        ref={props.categorySelector}
      />
    </React.Fragment>
  );
}
