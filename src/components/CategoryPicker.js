import React from 'react';
import { Textbox } from './styled-components/Boxes';
import { StyledText } from './styled-components/Text';
import { Row } from './styled-components/Links';
import { Colors } from './styled-components/Variables';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

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
    <Textbox bottomLine={Colors.PrimaryUtilityColor}>
      <Row>
        <StyledText>Kategorie</StyledText>
      </Row>
      <Row>
        <RNPickerSelect
          onValueChange={value => props.onValueChange(value)}
          items={categories}
          itemKey={props ? props.category : null}
          placeholder={{ label: 'Bitte wähle eine Kategorie', value: null }}
          ref={props.categorySelector}
        />
        <Ionicons name="ios-arrow-down" size={24} />
      </Row>
    </Textbox>
  );
}
