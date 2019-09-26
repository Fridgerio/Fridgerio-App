import React, { Fragment, useContext, useState } from 'react';
import { Platform, Text } from 'react-native';
import { Textbox } from './styled-components/Boxes';
import { StyledText } from './styled-components/Text';
import { Row } from './styled-components/Links';
import { Colors } from './styled-components/Variables';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { Context } from '../context/Context';

// const defaultCategories = [
//   { value: '1', label: 'Alle', icon: 'food', key: 'Alle' },
//   { value: '2', label: 'Obst&Gemüse', icon: 'food-apple', key: 'Obst&Gemüse' },
//   {
//     value: '3',
//     label: 'Milchprodukte',
//     icon: 'food-croissant',
//     key: 'Milchprodukte',
//   },
//   {
//     value: '4',
//     label: 'Nudeln, Reis usw.',
//     icon: 'food-fork-drink',
//     key: 'Nudeln, Reis usw.',
//   },
//   { value: '5', label: 'Getränke', icon: 'food-variant', key: 'Getränke' },
// ];

function ComponentIOS(props) {
  return (
    <Textbox bottomLine={Colors.PrimaryUtilityColor}>
      <Row>
        <StyledText>Kategorie</StyledText>
      </Row>
      <Row>
        <RNPickerSelect
          onValueChange={value => props.onValueChange(value)}
          items={props.categories}
          itemKey={props ? props.category : null}
          placeholder={{}}
          ref={props.categorySelector}
        />
        <Ionicons name="ios-arrow-down" size={24} />
      </Row>
    </Textbox>
  );
}

function ComponentAndroid(props) {
  return (
    <Fragment>
      <Textbox>
        <Text>Kategorie</Text>
      </Textbox>
      <RNPickerSelect
        onValueChange={value => props.onValueChange(value)}
        items={props.categories}
        itemKey={props ? props.category : null}
        placeholder={{}}
        ref={props.categorySelector}
      />
    </Fragment>
  );
}

// Returns picker with category names
export default function CategoryPicker(props) {
  const { categoryImages } = useContext(Context);
  const defaultCategories = categoryImages
    .filter(category => category !== 'all')
    .map(category => {
      let categoryName;
      switch (category) {
        case 'bread':
          categoryName = 'Brot, Mehl und Gebäck';
          break;
        case 'canned':
          categoryName = 'Konserven und Fertiggerichte';
          break;
        case 'dairy':
          categoryName = 'Käse und Milchprodukte';
          break;
        case 'drinks':
          categoryName = 'Getränke';
          break;
        case 'frozen':
          categoryName = 'Tiefkühlnahrung';
          break;
        case 'fruits':
          categoryName = 'Obst und Gemüse';
          break;
        case 'meat':
          categoryName = 'Fleisch, Fisch & Wurst';
          break;
        case 'pasta':
          categoryName = 'Getreide & Teigwaren';
          break;
        case 'sauces':
          categoryName = 'Soßen & Gewürze';
          break;
        case 'snacks':
          categoryName = 'Snacks & Süßigkeiten';
          break;
        default:
          categoryName = 'Bitte wähle eine Kategorie';
      }
      return {
        value: `${category}`,
        label: `${categoryName}`,
        icon: categoryImages[category],
        key: `${category}`,
      };
    });
  const PickerCategories = defaultCategories.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (b.label < a.label) {
      return 1;
    }
    return 0;
  });
  const [categories] = useState(PickerCategories);
  const Component = Platform.select({
    ios: () => ComponentIOS,
    android: () => ComponentAndroid,
  })();
  return (
    <Component categories={categories} onValueChange={props.onValueChange} />
  );
}
