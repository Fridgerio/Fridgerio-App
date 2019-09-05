import React from 'react';
import { Picker, Modal, View } from 'react-native';

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
      <Modal visible transparent>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: 200,
            backgroundColor: 'whitesmoke',
          }}
        >
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
        </View>
      </Modal>
    </React.Fragment>
  );
}
